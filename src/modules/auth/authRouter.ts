import express from 'express';

import authController from './authController';
import { validateBody } from '@/decorators/validateBody';
import { userSigninSchema, userSignupSchema } from '@/schemas/authSchemas';
import { authenticate } from '@/middelwares/authenticate';

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

authRouter.get('/verify/:verificationCode', authController.verifyEmail);

export { authRouter };
