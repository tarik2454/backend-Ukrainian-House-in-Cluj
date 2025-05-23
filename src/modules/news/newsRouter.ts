import express from 'express';

import newsController from './newsController';
import { isValidId } from '../../middelwares/isValidId';
import { authenticate } from '../../middelwares/authenticate';
import { createNewsItemSchema, updateNewsItemSchema } from './newsItemSchemas';
import { validateBody } from '../../decorators/validateBody';

const newsRouter = express.Router();

// newsRouter.use(authenticate);

newsRouter.get('/', newsController.getAll);

newsRouter.get('/:id', isValidId, newsController.getById);

newsRouter.post(
  '/',
  authenticate,
  validateBody(createNewsItemSchema),
  newsController.add
);

newsRouter.put(
  '/:id',
  authenticate,
  validateBody(updateNewsItemSchema),
  newsController.updateById
);

newsRouter.delete('/:id', authenticate, newsController.deleteById);

export { newsRouter };
