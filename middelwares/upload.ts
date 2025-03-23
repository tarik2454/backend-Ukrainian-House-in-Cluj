import { Request } from 'express';
import multer, { StorageEngine } from 'multer';
import path from 'path';

const destination: string = path.resolve('temp');

const storage: StorageEngine = multer.diskStorage({
  destination,
  filename: (_req: Request, file: Express.Multer.File, cb) => {
    const uniquePrefix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
    const filename = `${uniquePrefix}_${file.originalname}`;
    cb(null, filename);
  },
});

const limits = {
  fileSize: 1024 * 1024 * 5, // 5MB max file size
};

const upload = multer({
  storage,
  limits,
});

export default upload;
