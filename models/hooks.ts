import { NextFunction } from 'express';

interface CustomError extends Error {
  status?: number;
}

export const handleSaveError = (
  error: CustomError,
  data: any,
  next: NextFunction
) => {
  (error.status = 400), next();
};

export const preUpdate = function (next: NextFunction) {
  this.setOptions({ new: true });
  this.setOptions({ runValidators: true });
  next();
};
