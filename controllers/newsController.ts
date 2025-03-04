import { NextFunction, Request, Response } from 'express';

import NewsItem from '@/models/NewsItem';

import HttpError from '../helpers/HttpError';

import ctrlWrapper from '../decorators/ctrlWrapper';

interface RequestWithParams extends Request {
  params: {
    id: string;
  };
}

const getAll = async (req: Request, res: Response): Promise<void> => {
  const result = await NewsItem.find({}, '-createdAt -updatedAt');
  res.json(result);
};

const getById = async (
  req: RequestWithParams,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const result = await NewsItem.findOne(
    { _id: id },
    '-createdAt -updatedAt'
  );
  if (!result) {
    throw HttpError(404, `Event with id=${id} not found`);
  }
  res.json(result);
};

const add = async (req: Request, res: Response) => {
  const result = await NewsItem.create(req.body);
  res.status(201).json(result);
};

const updateById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await NewsItem.findByIdAndUpdate(id, req.body);
  if (!result) {
    throw HttpError(404, `Event with id=${id} not found`);
  }
  res.json(result);
};

const deleteById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await NewsItem.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, `Event with id=${id} not found`);
  }
  res.json({ message: 'Delete success' });
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
