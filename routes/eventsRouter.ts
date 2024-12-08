import express from 'express';
import {
  getAllEvents,
  getOneEvent,
  deleteEvent,
  createEvent,
  updateEvent,
} from '../controllers/eventsController.js';

const invokeAction = async ({ id }: { id?: string }) => {
  // const allEvents = await getAllEvents();
  // return console.log(allEvents);
  if (id) {
    const oneEvent = await getOneEvent({ id });
    console.log('One Event:', oneEvent);
    return oneEvent;
  }

  const newEvent = await createEvent({
    title: 'New Event',
    description: 'Sample description',
    tags: ['shop'],
    date: '08/12/2024',
  });
  return console.log(newEvent);
};

invokeAction({});

const eventsRouter = express.Router();

eventsRouter.get('/', getAllEvents);

eventsRouter.get('/:id', getOneEvent);

eventsRouter.delete('/:id', deleteEvent);

// eventsRouter.post('/', createEvent);

eventsRouter.put('/:id', updateEvent);

export default eventsRouter;
