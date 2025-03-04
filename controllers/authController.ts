import { NextFunction, Request, Response } from 'express';

import User from '../models/User';

import HttpError from '../helpers/HttpError';

import ctrlWrapper from '../decorators/ctrlWrapper';

const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export default {
  getAll: ctrlWrapper(signup),
};
