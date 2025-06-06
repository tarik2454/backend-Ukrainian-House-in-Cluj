import { Schema, model } from 'mongoose';

import { handleSaveError, preUpdate } from '../../hooks/modelsHook';
import { emailRegex } from '../../constants/regex';

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: emailRegex,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      minLength: 6,
      required: true,
    },
    avatarURL: { type: String },
    token: {
      type: String,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
    },

    // role: {
    //   type: String,
    //   enum: ['user', 'admin'],
    //   default: 'user',
    // },
  },

  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleSaveError);

userSchema.pre('findOneAndUpdate', preUpdate);

userSchema.post('findOneAndUpdate', handleSaveError);

const User = model('user', userSchema);

export { User };
