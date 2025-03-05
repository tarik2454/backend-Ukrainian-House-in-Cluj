import { Schema, model } from 'mongoose';

import { handleSaveError, preUpdate } from './hooks';

import { tags } from '../constants/tags';

import { publicationDateRegex } from '../constants/regex';

const eventSchema = new Schema(
  {
    publicationDate: {
      type: String,
      match: publicationDateRegex,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    img: { type: String },
    description: {
      type: String,
      required: true,
    },
    eventDate: {
      type: {
        date: { type: String, match: publicationDateRegex },
        time: { type: String },
        location: { type: String },
      },
    },
    registration: {
      type: Boolean,
      default: false,
      required: true,
    },
    tags: {
      type: [String],
      enum: tags,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },

  { versionKey: false, timestamps: true }
);

eventSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.createdAt;
    delete ret.updatedAt;
    return ret;
  },
});

eventSchema.post('save', handleSaveError);

eventSchema.pre('findOneAndUpdate', preUpdate);

eventSchema.post('findOneAndUpdate', handleSaveError);

const Event = model('event', eventSchema);

export default Event;
