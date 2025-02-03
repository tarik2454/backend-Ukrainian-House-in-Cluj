import express from 'express';

import newsController from '../controllers/newsController';

import validateBody from '../decorators/validateBody';

import isValidId from '@/middelwares/isValidId';

import {
  createEventSchema,
  eventUpdateFavoriteSchema,
  updateEventSchema,
} from '../schemas/eventSchemas';

const newsRouter = express.Router();

newsRouter.get('/', newsController.getAll);

newsRouter.get('/:id', isValidId, newsController.getById);

newsRouter.post('/', validateBody(createEventSchema), newsController.add);

newsRouter.put(
  '/:id',
  validateBody(updateEventSchema),
  newsController.updateById
);

newsRouter.delete('/:id', newsController.deleteById);

export default newsRouter;
