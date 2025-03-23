import express from 'express';

import authController from '../controllers/authController';

import validateBody from '../decorators/validateBody';

import { userSignupSchema, userSigninSchema } from '../schemas/authSchemas';

import authenticate from '../middelwares/authenticate';

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

authRouter.get('/current', authenticate, authController.getCurrent);

authRouter.post('/signout', authenticate, authController.signout);

export default authRouter;
