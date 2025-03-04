import Joi from 'joi';

import { emailRegex } from '@/constants/regex';

export const userSignupSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().pattern(emailRegex).required().messages({
    'any.required': `"email" must be exist`,
    'string.email': `"email" must be a valid email`,
  }),
  password: Joi.string().min(6).required().messages({
    'any.required': `"password" must be exist`,
    'string.base': `"password" must be string`,
  }),
});

export const userSigninSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required().messages({
    'any.required': `"email" must be exist`,
    'string.email': `"email" must be a valid email`,
  }),
  password: Joi.string().min(6).required().messages({
    'any.required': `"password" must be exist`,
    'string.base': `"password" must be string`,
  }),
});
