import { Request, Response } from 'express';
import fs from 'fs/promises';
import { nanoid } from 'nanoid';
import path from 'path';

import { CreateEventData } from '../types/event';

const filePath = path.resolve('db', 'events.json');

export const getAllEvents = async () => {
  const data = await fs.readFile(filePath, 'utf8');
  return JSON.parse(data);
};

export const getOneEvent = async ({ id }: { id: string }) => {
  const events = await getAllEvents();
  const result = events.find((event: { id: string }) => event.id === id);
  return result || null;
};

export const deleteEvent = (req: Request, res: Response) => {
  // ваш код
};

export const createEvent = async (data: CreateEventData) => {
  const events = await getAllEvents();
  const newEvent = {
    id: nanoid(),
    ...data,
  };
  events.push(newEvent);
  await fs.writeFile(filePath, JSON.stringify(events, null, 2));
  return newEvent;
};

export const updateEvent = (req: Request, res: Response) => {
  // ваш код
};
