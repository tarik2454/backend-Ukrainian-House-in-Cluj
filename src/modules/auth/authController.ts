import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import path from 'path';
import gravatar from 'gravatar';
import fs from 'fs/promises';
import { nanoid } from 'nanoid';

import { User } from '@/src/models/User';
import { HttpError } from '@/src/helpers/HttpError';
import { sendEmail } from '@/src/helpers/sendEmail';
import { ctrlWrapper } from '@/src/decorators/ctrlWrapper';

interface AuthRequest extends Request {
  user?: { _id: string; username?: string; email?: string };
}

const { JWT_SECRET, BASE_URL_LOCAL } = process.env;

const avatarPath = path.resolve('public', 'avatars');

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET not set in environment variables!');
}

const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  let avatarURL: string;

  if (req.file) {
    const { path: oldPath, filename } = req.file;
    const newPath = path.join(avatarPath, filename);
    await fs.rename(oldPath, newPath);
    avatarURL = path.join('avatars', filename);
  } else {
    avatarURL = gravatar.url(email, { s: '250', d: 'retro' });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw HttpError(409, 'Email already in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const verificationCode = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    verificationCode,
    avatarURL,
  });

  const verifyEmail = {
    to: email,
    subject: 'Verify email',
    html: `<a target="_blank" href="${BASE_URL_LOCAL}/api/auth/verify/${verificationCode}">Click to verify your email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    username: newUser.username,
    email: newUser.email,
    avatarURL: newUser.avatarURL,
  });
};

const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, 'Email or password is invalid');
  }

  if (!user.verify) {
    throw HttpError(401, 'Email not verified');
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, 'Email or password is invalid');
  }

  const payload = {
    id: user.id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '23h' });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({ token });
};

const getCurrent = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    throw HttpError(401, 'Not authorized');
  }
  const { username, email } = req.user;

  res.json({ username, email });
};

const signout = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    throw HttpError(401, 'Not authorized');
  }
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: '' });

  res.json({
    message: 'Signout successful',
  });
};

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  getCurrent: ctrlWrapper(getCurrent),
  signout: ctrlWrapper(signout),
};
