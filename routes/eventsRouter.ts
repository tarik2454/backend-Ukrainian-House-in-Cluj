import express from 'express';

import eventsController from '../controllers/eventsController';

import validateBody from '../decorators/validateBody';

import isValidId from '../middelwares/isValidId';
import authenticate from '../middelwares/authenticate';
import upload from '../middelwares/upload';

import HttpError from '../helpers/HttpError';

import {
  createEventSchema,
  eventUpdateFavoriteSchema,
  updateEventSchema,
} from '../schemas/eventSchemas';

const eventsRouter = express.Router();

// eventsRouter.use(authenticate);

eventsRouter.get('/', eventsController.getAll);

eventsRouter.get('/:id', isValidId, eventsController.getById);

eventsRouter.post(
  '/',
  authenticate,
  upload.single('img'),
  (req, res, next) => {
    try {
      // Если eventDate передан строкой — парсим
      if (typeof req.body.eventDate === 'string') {
        try {
          req.body.eventDate = JSON.parse(req.body.eventDate);
        } catch {
          return next(HttpError(400, 'Invalid JSON format in eventDate'));
        }
      }

      // Если tags передан строкой — парсим
      if (typeof req.body.tags === 'string') {
        try {
          req.body.tags = JSON.parse(req.body.tags);
          if (!Array.isArray(req.body.tags)) {
            throw new Error();
          }
        } catch {
          return next(
            HttpError(400, 'Invalid JSON format in tags, must be an array')
          );
        }
      }

      next();
    } catch (error) {
      next(HttpError(400, error));
    }
  },
  validateBody(createEventSchema),
  eventsController.add
);

eventsRouter.put(
  '/:id',
  authenticate,
  validateBody(updateEventSchema),
  eventsController.updateById
);

eventsRouter.patch(
  '/:id/favorite',
  authenticate,
  isValidId,
  validateBody(eventUpdateFavoriteSchema),
  eventsController.updateFavorite
);

eventsRouter.delete('/:id', authenticate, eventsController.deleteById);

export default eventsRouter;
