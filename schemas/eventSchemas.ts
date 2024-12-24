import Joi from 'joi';

export const createEventSchema = Joi.object({
  title: Joi.string().required(),
  img: Joi.string(),
  description: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).required(),
  date: Joi.date().required(),
});

export const updateEventSchema = Joi.object({});
