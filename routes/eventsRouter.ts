import express from 'express';

import eventsController from '../controllers/eventsController';

import validateBody from '../decorators/validateBody';

import { createEventSchema, updateEventSchema } from '../schemas/eventSchemas';

import isValidId from '@/middelwares/isValidId';

const eventsRouter = express.Router();

eventsRouter.get('/', eventsController.getAll);

eventsRouter.get('/:id', isValidId, eventsController.getById);

eventsRouter.post('/', validateBody(createEventSchema), eventsController.add);

eventsRouter.put(
  '/:id',
  validateBody(updateEventSchema),
  eventsController.updateById
);

// eventsRouter.delete('/:id', eventsController.deleteById);

export default eventsRouter;
