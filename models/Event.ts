import { Schema, model } from 'mongoose';

import { handleSaveError } from './hooks';

import { tags } from '@/constants/tags';
import { publicationDateRegex } from '@/constants/regex';

const eventSchema = new Schema(
  {
    publicationDate: {
      type: String,
      match: publicationDateRegex,
      required: true,
    },
    title: { type: String, required: true },
    img: { type: String },
    description: { type: String, required: true },
    eventDate: {
      date: { type: String },
      time: { type: String },
      location: { type: String },
    },
    registration: { type: Boolean, default: false, required: true },
    tags: {
      type: [String],
      enum: tags,
      required: true,
    },
    favorites: { type: Boolean, default: false },
  },
  { versionKey: false, timestamps: true }
);

eventSchema.post('save', handleSaveError);

const Event = model('event', eventSchema);

export default Event;
