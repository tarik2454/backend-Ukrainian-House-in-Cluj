import { Request, Response, NextFunction } from 'express';

function ctrlWrapper() {
  return (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (
      req: Request,
      res: Response,
      next: NextFunction
    ) {
      try {
        await originalMethod.apply(this, [req, res, next]);
      } catch (err) {
        next(err);
      }
    };

    return descriptor;
  };
}

export default ctrlWrapper;
