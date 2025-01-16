import { Request, Response, NextFunction } from 'express';

export default function ctrlWrapper(ctrl: Function) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await ctrl(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}
