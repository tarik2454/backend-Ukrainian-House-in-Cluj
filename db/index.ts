import fs from 'fs/promises';
import { nanoid } from 'nanoid';
import path from 'path';

interface Event {
  id: string;
  [key: string]: any;
}

const eventsPath = path.resolve('db', 'events.json');

const updateEvents = async (events: Event[]): Promise<void> => {
  await fs.writeFile(eventsPath, JSON.stringify(events, null, 2));
};

export const getAllEvents = async (): Promise<Event[]> => {
  const data = await fs.readFile(eventsPath, 'utf8');
  return JSON.parse(data);
};

export const getOneEvent = async (id: string): Promise<Event | null> => {
  const events = await getAllEvents();
  const result = events.find(event => event.id === id);
  return result || null;
};

export const createEvent = async (body: Partial<Event>): Promise<Event> => {
  const events = await getAllEvents();
  const newEvent: Event = {
    id: nanoid(),
    ...body,
  };
  events.push(newEvent);
  await updateEvents(events);
  return newEvent;
};

export const updateEvent = async ({
  id,
  data,
}: {
  id: string;
  data: Omit<Event, 'id'>;
}): Promise<Event | null> => {
  const events = await getAllEvents();
  const index = events.findIndex(event => event.id === id);
  if (index === -1) {
    return null;
  }
  events[index] = { ...events[index], ...data };
  await updateEvents(events);
  return events[index];
};

export const deleteEvent = async (id: string): Promise<Event | null> => {
  const events = await getAllEvents();
  const index = events.findIndex(event => event.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = events.splice(index, 1);
  await updateEvents(events);
  return result;
};
