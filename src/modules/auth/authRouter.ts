import express from 'express';

import authController from './authController';
import { validateBody } from '@/src/decorators/validateBody';
import { userSigninSchema, userSignupSchema } from '@/src/schemas/authSchemas';
import { authenticate } from '@/src/middelwares/authenticate';

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

export { authRouter };
