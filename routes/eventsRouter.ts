import express from 'express';
import {
  getAllEvents,
  getOneEvent,
  deleteEvent,
  createEvent,
  updateEvent,
} from '../controllers/eventsController.js';

import { CreateEventData } from '../types/event';

interface InvokeActionData extends CreateEventData {
  action: 'list' | 'getById' | 'add' | 'updateById' | 'deleteById';
  id: string;
}

const invokeAction = async ({
  action,
  id,
  title,
  description,
  tags,
  date,
}: InvokeActionData) => {
  switch (action) {
    case 'list':
      const allEvents = await getAllEvents();
      return console.log(allEvents);
    case 'getById':
      const oneEvent = await getOneEvent({ id });
      return console.log(oneEvent);
    case 'add':
      const newEvent = await createEvent({
        title: 'New Event',
        description: 'Sample description',
        tags: ['shop'],
        date: '08/12/2024',
      });
      return console.log(newEvent);
    case 'updateById':
      const updatedEvent = await updateEvent({
        id,
        data: { title, description, tags, date },
      });
      return console.log(updatedEvent);
    case 'deleteById':
      const deletedEvent = await deleteEvent(id);
      return console.log(deletedEvent);
    default:
  }
};

invokeAction({
  action: 'deleteById',
  id: 's25XLJPfsh6tkOe8mH4cZ',
});

const eventsRouter = express.Router();

eventsRouter.get('/', getAllEvents);

eventsRouter.get('/:id', getOneEvent);

eventsRouter.delete('/:id', deleteEvent);

// eventsRouter.post('/', createEvent);

eventsRouter.put('/:id', updateEvent);

export default eventsRouter;
