import Joi from 'joi';

export const userSignUpSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': `"email" must be exist`,
    'string.email': `"email" must be a valid email`,
  }),
  password: Joi.string().required().messages({
    'any.required': `"password" must be exist`,
    'string.base': `"password" must be string`,
  }),
});
