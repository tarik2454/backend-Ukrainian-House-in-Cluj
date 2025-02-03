import { Schema, model } from 'mongoose';

import { handleSaveError, preUpdate } from './hooks';

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
  },

  { versionKey: false, timestamps: true }
);

eventSchema.post('save', handleSaveError);

eventSchema.pre('findOneAndUpdate', preUpdate);

eventSchema.post('findOneAndUpdate', handleSaveError);

const News = model('news', eventSchema);

export default News;
