import express from 'express';

import newsController from '../controllers/newsController';

import validateBody from '../decorators/validateBody';

import isValidId from '../middelwares/isValidId';
import authenticate from '@/middelwares/authenticate';

import {
  createNewsItemSchema,
  updateNewsItemSchema,
} from '../schemas/newsItemSchemas';

const newsRouter = express.Router();

newsRouter.use(authenticate);

newsRouter.get('/', newsController.getAll);

newsRouter.get('/:id', isValidId, newsController.getById);

newsRouter.post('/', validateBody(createNewsItemSchema), newsController.add);

newsRouter.put(
  '/:id',
  validateBody(updateNewsItemSchema),
  newsController.updateById
);

newsRouter.delete('/:id', newsController.deleteById);

export default newsRouter;
