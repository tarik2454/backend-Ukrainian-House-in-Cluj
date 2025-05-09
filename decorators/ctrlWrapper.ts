import { Request, Response, NextFunction } from 'express';

export function ctrlWrapper(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}
