import express from 'express';

import validateBody from '@/decorators/validateBody';

import { userSignupSchema, userSigninSchema } from '@/schemas/authSchemas';

const authRouter = express.Router();

export default authRouter.post('/signup', validateBody(userSignupSchema));
