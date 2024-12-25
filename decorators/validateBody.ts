import { Request, Response, NextFunction } from 'express';
import HttpError from '../helpers/HttpError';

// Декоратор для валидации тела запроса
function validateBody(schema: any) {
  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (
      req: Request,
      res: Response,
      next: NextFunction
    ) {
      const { error } = schema.validate(req.body);
      if (error) {
        return next(HttpError(400, error.message));
      }

      return originalMethod.apply(this, [req, res, next]);
    };

    return descriptor;
  };
}

export default validateBody;
