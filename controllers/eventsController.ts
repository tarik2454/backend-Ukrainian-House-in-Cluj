import { NextFunction, Request, Response } from 'express';

import HttpError from '../helpers/HttpError.ts';

import ctrlWrapper from '../decorators/ctrlWrapper.ts';

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

const getAll = async (req: Request, res: Response): Promise<void> => {
  const result = await getAllEvents();
  res.json(result);
};

const getById = async (
  req: RequestWithParams,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const result = await getOneEvent(id);
  if (!result) {
    throw HttpError(404, `Event with id=${id} not found`);
  }
  res.json(result);
};

const add = async (req: Request, res: Response) => {
  const result = await createEvent(req.body);
  res.status(201).json(result);
};

const updateById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await updateEvent({ id, data: req.body });
  if (!result) {
    throw HttpError(404, `Event with id=${id} not found`);
  }
  res.json(result);
};

const deleteById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await deleteEvent(id);
  if (!result) {
    throw HttpError(404, `Event with id=${id} not found`);
  }
  // res.status(204).send(); // response.body non send;
  res.json({ message: 'Delete successfully' });
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
