import { NextFunction } from 'express';

interface CustomError extends Error {
  status?: number;
  code?: number;
}

export const handleSaveError = (
  error: CustomError,
  data: any,
  next: NextFunction
) => {
  const { name, code } = error;
  error.status = name === 'MongoServerError' && code === 11000 ? 409 : 400;
  next();
};

export const preUpdate = function (next: NextFunction) {
  this.setOptions({ new: true });
  this.setOptions({ runValidators: true });
  next();
};
