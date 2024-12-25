import express from 'express';
import {
  add,
  getAll,
  getById,
  updateById,
  deleteById,
} from '../controllers/eventsController.ts';

const eventsRouter = express.Router();

eventsRouter.get('/', getAll);

eventsRouter.get('/:id', getById);

eventsRouter.post('/', add);

eventsRouter.put('/:id', updateById);

eventsRouter.delete('/:id', deleteById);

export default eventsRouter;
