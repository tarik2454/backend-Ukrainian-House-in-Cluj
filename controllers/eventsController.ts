import { NextFunction, Request, Response } from 'express';
import { getAllEvents, getOneEvent, createEvent } from '../db/index.js';
import HttpError from '../helpers/HttpError.js';
import { nanoid } from 'nanoid';
import { createEventSchema } from '../schemas/eventSchemas.js';

interface RequestWithParams extends Request {
  params: {
    id: string;
  };
}

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await getAllEvents();
    res.json(result);
  } catch (error) {
    next(error);
    //   const errorMessage =
    //     error instanceof Error ? error.message : 'Unknown error occurred';
    //   res.status(500).json({ message: errorMessage });
  }
};

export const getById = async (
  req: RequestWithParams,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await getOneEvent(id);
    if (!result) {
      throw HttpError(404, `Event with id=${id} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
    // if (error instanceof Error && 'status' in error) {
    //   const { status = 500, message } = error as HttpError;
    //   res.status(status).json({ message });
    // } else {
    //   const errorMessage =
    //     error instanceof Error ? error.message : 'Unknown error occurred';
    //   res.status(500).json({ message: errorMessage });
    // }
  }
};

export const add = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error } = createEventSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await createEvent(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

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
