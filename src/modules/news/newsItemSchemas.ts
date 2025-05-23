import Joi from 'joi';

import { publicationDateRegex } from '../../constants/regex';

export const createNewsItemSchema = Joi.object({
  publicationDate: Joi.string()
    .pattern(publicationDateRegex)
    .required()
    .messages({
      'any.required': `"date" must be exist`,
      'string.pattern.base': `"date" must match the format DD-MM-YYYY`,
    }),
  title: Joi.string().required().messages({
    'any.required': `"title" must be exist`,
    'string.base': `"title" must be string`,
  }),
  img: Joi.string(),
  description: Joi.string()
    .required()
    .messages({ 'any.required': `"description" must be exist` }),
});

export const updateNewsItemSchema = Joi.object({
  publicationDate: Joi.string(),
  title: Joi.string().messages({ 'string.base': `"title" must be string` }),
  img: Joi.string(),
  description: Joi.string(),
});
