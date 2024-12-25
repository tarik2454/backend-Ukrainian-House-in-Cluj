import Joi from 'joi';

export const createEventSchema = Joi.object({
  publicationDate: Joi.date().required(),
  title: Joi.string().required(),
  img: Joi.string().required(),
  description: Joi.string().required(),
  eventDate: Joi.object({
    date: Joi.string(),
    time: Joi.string(),
    location: Joi.string(),
  }),
  registration: Joi.boolean().required(),
  tags: Joi.array().items(Joi.string()).required(),
});

export const updateEventSchema = Joi.object({
  publicationDate: Joi.date(),
  title: Joi.string(),
  img: Joi.string(),
  description: Joi.string(),
  eventDate: Joi.object({
    date: Joi.string(),
    time: Joi.string(),
    location: Joi.string(),
  }),
  registration: Joi.boolean(),
  tags: Joi.array().items(Joi.string()),
});
