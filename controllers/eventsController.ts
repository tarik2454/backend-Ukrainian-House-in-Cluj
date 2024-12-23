import { Request, Response } from 'express';
import { getAllEvents, getOneEvent } from '../db/index.js';

interface RequestWithParams extends Request {
  params: {
    id: string;
  };
}

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await getAllEvents();
    res.json(result);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    res.status(500).json({ message: errorMessage });
  }
};

export const getById = async (
  req: RequestWithParams,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await getOneEvent(id);
    if (!result) {
      res.status(404).json({ message: `Event with id=${id} not found` });
    }
    res.json(result);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    res.status(500).json({ message: errorMessage });
  }
};

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
