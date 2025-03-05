import { NextFunction, Request, Response } from 'express';

import Event from '../models/Event';

import HttpError from '../helpers/HttpError';

import ctrlWrapper from '../decorators/ctrlWrapper';

interface RequestWithParams extends Request {
  params: {
    id: string;
  };
}

const getAll = async (req: Request, res: Response): Promise<void> => {
  const result = await Event.find({}, '-createdAt -updatedAt');
  res.json(result);
};

const getById = async (
  req: RequestWithParams,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const result = await Event.findOne({ _id: id }, '-createdAt -updatedAt');
  if (!result) {
    throw HttpError(404, `Event with id=${id} not found`);
  }
  res.json(result);
};

const add = async (req: Request, res: Response) => {
  const result = await Event.create(req.body);
  res.status(201).json(result);
};

const updateById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await Event.findByIdAndUpdate(id, req.body);
  if (!result) {
    throw HttpError(404, `Event with id=${id} not found`);
  }
  res.json(result);
};

const updateFavorite = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await Event.findByIdAndUpdate(id, req.body);
  if (!result) {
    throw HttpError(404, `Event with id=${id} not found`);
  }
  res.json(result);
};

const deleteById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await Event.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, `Event with id=${id} not found`);
  }
  // res.status(204).send(); // response.body non send;
  res.json({ message: 'Delete success' });
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  updateFavorite: ctrlWrapper(updateFavorite),
  deleteById: ctrlWrapper(deleteById),
};
