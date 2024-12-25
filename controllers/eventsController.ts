import { NextFunction, Request, Response } from 'express';

import HttpError from '../helpers/HttpError.js';
import {
  createEventSchema,
  updateEventSchema,
} from '../schemas/eventSchemas.js';

import {
  getAllEvents,
  getOneEvent,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../db/index.js';

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

export const updateById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = updateEventSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { id } = req.params;
    const result = await updateEvent({ id, data: req.body });
    if (!result) {
      throw HttpError(404, `Event with id=${id} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await deleteEvent(id);
    if (!result) {
      throw HttpError(404, `Event with id=${id} not found`);
    }
    // res.status(204).send(); // response.body non send;
    res.json({ message: 'Delete successfully' });
  } catch (error) {
    next(error);
  }
};
