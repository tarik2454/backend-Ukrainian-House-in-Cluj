import { NextFunction, Request, Response } from 'express';

import jwt, { JwtPayload } from 'jsonwebtoken';

import HttpError from '../helpers/HttpError';

import User from '../models/User';

import { UserType } from '../types/user';

interface AuthenticatedRequest extends Request {
  user?: UserType;
}

const { JWT_SECRET } = process.env;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET not set in environment variables!');
}

const authenticate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer' || !token) {
    return next(HttpError(401, 'Unauthorized: No valid token provided'));
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET) as JwtPayload;
    const user = await User.findById(id);
    if (!user || !user.token) {
      return next(HttpError(401, 'Unauthorized: User not found'));
    }
    req.user = user;
    next();
  } catch (error) {
    // next(HttpError(401, error.message));
    if (error instanceof jwt.JsonWebTokenError) {
      return next(HttpError(401, 'Unauthorized: Invalid token'));
    }
    next(HttpError(401, 'Unauthorized: Token verification failed'));
  }
};

export default authenticate;
