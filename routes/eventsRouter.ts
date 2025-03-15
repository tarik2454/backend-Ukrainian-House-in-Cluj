import express from 'express';

import eventsController from '../controllers/eventsController';

import validateBody from '../decorators/validateBody';

import isValidId from '../middelwares/isValidId';
import authenticate from '../middelwares/authenticate';

import {
  createEventSchema,
  eventUpdateFavoriteSchema,
  updateEventSchema,
} from '../schemas/eventSchemas';

const eventsRouter = express.Router();

eventsRouter.use(authenticate);

eventsRouter.get('/', eventsController.getAll);

eventsRouter.get('/:id', isValidId, eventsController.getById);

eventsRouter.post('/', validateBody(createEventSchema), eventsController.add);

eventsRouter.put(
  '/:id',
  validateBody(updateEventSchema),
  eventsController.updateById
);

eventsRouter.patch(
  '/:id/favorite',
  isValidId,
  validateBody(eventUpdateFavoriteSchema),
  eventsController.updateFavorite
);

eventsRouter.delete('/:id', eventsController.deleteById);

export default eventsRouter;
