import { Request, Response, NextFunction } from 'express';
import HttpError from '../helpers/HttpError';

export default function validateBody(schema: any) {
  return function (req: Request, res: Response, next: NextFunction): void {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(HttpError(400, error.message));
    }
    next();
  };
}
