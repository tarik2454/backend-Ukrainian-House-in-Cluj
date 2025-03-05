import express from 'express';

import authController from '../controllers/authController';

import validateBody from '../decorators/validateBody';

import { userSignupSchema, userSigninSchema } from '../schemas/authSchemas';

const authRouter = express.Router();

authRouter.post(
  '/signup',
  validateBody(userSignupSchema),
  authController.signup
);

authRouter.post(
  '/signin',
  validateBody(userSigninSchema),
  authController.signin
);

export default authRouter;
