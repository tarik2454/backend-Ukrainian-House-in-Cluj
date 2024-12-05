import express from 'express';
import {
  getAllEvents,
  getOneEvent,
  deleteEvent,
  createEvent,
  updateEvent,
} from '../controllers/eventsController.js';

const eventsRouter = express.Router();

eventsRouter.get('/', getAllEvents);

eventsRouter.get('/:id', getOneEvent);

eventsRouter.delete('/:id', deleteEvent);

eventsRouter.post('/', createEvent);

eventsRouter.put('/:id', updateEvent);

export default eventsRouter;
