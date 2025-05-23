import Joi from 'joi';

import { tags } from '../../constants/tags';

import { publicationDateRegex } from '../../constants/regex';

export const createEventSchema = Joi.object({
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
  eventDate: Joi.object({
    date: Joi.string(),
    time: Joi.string(),
    location: Joi.string(),
  }),
  registration: Joi.boolean().required(),
  tags: Joi.array()
    .items(Joi.string().valid(...tags))
    .required()
    .messages({
      'any.required': `"tags" must be exist`,
      'array.includes': `"tags" contains an invalid value`,
    }),
  favorite: Joi.boolean(),
});

export const updateEventSchema = Joi.object({
  publicationDate: Joi.string(),
  title: Joi.string().messages({ 'string.base': `"title" must be string` }),
  img: Joi.string(),
  description: Joi.string(),
  eventDate: Joi.object({
    date: Joi.string(),
    time: Joi.string(),
    location: Joi.string(),
  }),
  registration: Joi.boolean(),
  tags: Joi.array().items(Joi.string()),
  favorite: Joi.boolean(),
});

export const eventUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
