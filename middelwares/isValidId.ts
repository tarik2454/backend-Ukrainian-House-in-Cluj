import { Request, Response, NextFunction } from 'express';
import { isValidObjectId } from 'mongoose';
import HttpError from '@/helpers/HttpError';

const isValidId = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return next(HttpError(404, `${id} is not a valid id`));
  }
  next();
};

export default isValidId;
