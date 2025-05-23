import { Schema, model } from 'mongoose';

import { publicationDateRegex } from '../../constants/regex';
import { handleSaveError, preUpdate } from '../../hooks/modelsHook';

const newsItemSchema = new Schema(
  {
    publicationDate: {
      type: String,
      match: publicationDateRegex,
      required: true,
    },
    title: { type: String, required: true },
    img: { type: String },
    description: { type: String, required: true },
  },

  { versionKey: false, timestamps: true }
);

newsItemSchema.post('save', handleSaveError);

newsItemSchema.pre('findOneAndUpdate', preUpdate);

newsItemSchema.post('findOneAndUpdate', handleSaveError);

const NewsItem = model('news', newsItemSchema);

export { NewsItem };
