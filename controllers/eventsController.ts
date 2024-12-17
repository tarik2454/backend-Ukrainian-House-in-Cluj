import { Request, Response } from 'express';
import fs from 'fs/promises';
import { nanoid } from 'nanoid';
import path from 'path';

import { CreateEventData } from '../types/event';

const eventsPath = path.resolve('db', 'events.json');

const updateEvents = (events: CreateEventData[]) =>
  fs.writeFile(eventsPath, JSON.stringify(events, null, 2));

export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const data = await fs.readFile(eventsPath, 'utf8');
    const events = JSON.parse(data);
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve events', error });
  }
};

// export const getOneEvent = async ({ id }: { id: string }) => {
//   const events = await getAllEvents();
//   const result = events.find((event: { id: string }) => event.id === id);
//   return result || null;
// };

// export const createEvent = async (req: Request, res: Response) => {
//   try {
//     const events = await getAllEvents();
//     const newEvent = {
//       id: nanoid(),
//       ...req.body,
//     };
//     events.push(newEvent);
//     await updateEvents(events);
//     res.status(201).json(newEvent);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to create event', error });
//   }
// };

// export const updateEvent = async ({
//   id,
//   data,
// }: {
//   id: string;
//   data: CreateEventData;
// }) => {
//   const events = await getAllEvents();
//   const index = events.findIndex((event: { id: string }) => event.id === id);
//   if (index === -1) {
//     return null;
//   }
//   events[index] = { id, ...data };
//   await updateEvents(events);
//   return events[index];
// };

// export const deleteEvent = async (id: string) => {
//   const events = await getAllEvents();
//   const index = events.findIndex((event: { id: string }) => event.id === id);
//   if (index === -1) {
//     return null;
//   }
//   const [result] = events.splice(index, 1);
//   await updateEvents(events);
//   return result;
// };
