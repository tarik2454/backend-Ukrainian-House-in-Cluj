import express from 'express';

import authController from './authController';
import { validateBody } from '../../decorators/validateBody';
import { userSigninSchema, userSignupSchema } from './authSchemas';
import { authenticate } from '../../middelwares/authenticate';
import { upload } from '../../middelwares/upload';

const authRouter = express.Router();

authRouter.post(
  '/signup',
  upload.single('avatarURL'),
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
