import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import 'dotenv/config';

import authRouter from './modules/auth/authRouter';
import { eventsRouter } from './modules/events/eventsRouter';
import { newsRouter } from './modules/news/newsRouter';

interface HttpError extends Error {
  status: number;
}

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/auth', authRouter);
app.use('/api/events', eventsRouter);
app.use('/api/news', newsRouter);

app.use((_: Request, res: Response) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err: HttpError, req: Request, res: Response, _next: NextFunction) => {
  const { status = 500, message = 'Internal Server Error' } = err;
  res.status(status).json({ error: message });
});

export default app;
