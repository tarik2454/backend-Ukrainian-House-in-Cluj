import fs from 'fs/promises';
import { nanoid } from 'nanoid';
import path from 'path';

interface Event {
  id: string;
  [key: string]: any; // Тип для других полей события, если они динамические
}

const eventsPath = path.resolve('db', 'events.json');

// Функция обновления событий
const updateEvents = async (events: Event[]): Promise<void> => {
  await fs.writeFile(eventsPath, JSON.stringify(events, null, 2));
};

// Функция для получения всех событий
export const getAllEvents = async (): Promise<Event[]> => {
  const data = await fs.readFile(eventsPath, 'utf8');
  return JSON.parse(data);
};

// Функция для получения одного события по id
export const getOneEvent = async (id: string): Promise<Event | null> => {
  const events = await getAllEvents();
  const result = events.find(event => event.id === id);
  return result || null;
};

// Функция для создания нового события
export const createEvent = async (
  req: { body: Omit<Event, 'id'> },
  res: { status: Function, json: Function }
): Promise<void> => {
  try {
    const events = await getAllEvents();
    const newEvent: Event = {
      id: nanoid(),
      ...req.body,
    };
    events.push(newEvent);
    await updateEvents(events);
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create event', error });
  }
};

// Функция для обновления события
export const updateEvent = async ({
  id,
  data,
}: {
  id: string,
  data: Omit<Event, 'id'>,
}): Promise<Event | null> => {
  const events = await getAllEvents();
  const index = events.findIndex(event => event.id === id);
  if (index === -1) {
    return null;
  }
  events[index] = { id, ...data };
  await updateEvents(events);
  return events[index];
};

// Функция для удаления события
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
