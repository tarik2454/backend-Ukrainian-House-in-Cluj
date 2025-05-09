import { Request, Response } from 'express';
import fs from 'fs/promises';


import Event from '../../models/Event';
import { HttpError } from '@/helpers/HttpError';
import { cloudinary } from '@/helpers/cloudinary';
import {ctrlWrapper} from '@/decorators/ctrlWrapper';



interface RequestWithParams extends Request {
  params: {
    id: string;
  };
}

// const postersEventsPath = path.resolve('public', 'postersEvents');

const getAll = async (req: Request, res: Response): Promise<void> => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const result = await Event.find({}, {}, { skip, limit });
  res.json(result);
};

const getById = async (
  req: RequestWithParams,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const result = await Event.findOne({ _id: id });
  if (!result) {
    throw HttpError(404, `Event with id=${id} not found`);
  }
  res.json(result);
};

const add = async (req: Request, res: Response) => {
  if (!req.file) {
    throw HttpError(400, 'File is missing');
  }
  const { url: poster } = await cloudinary.uploader.upload(req.file.path, {
    folder: 'backend-Ukrainian-House-in-Cluj/postersEvents',
  });
  await fs.unlink(req.file.path);
  // const { path: oldPath, filename } = req.file;
  // const newPath = path.join(postersEventsPath, filename);
  // await fs.rename(oldPath, newPath);
  // const poster = path.join('postersEvents', filename);
  const result = await Event.create({ ...req.body, poster });
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
