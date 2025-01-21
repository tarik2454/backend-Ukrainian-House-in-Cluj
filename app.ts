import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

import eventsRouter from './routes/eventsRouter';

dotenv.config();

interface HttpError extends Error {
  status: number;
}

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

app.use('/api/events', eventsRouter);

// import db from './db/events.json' assert { type: 'json' };
// app.get('/', (req, res) => {
//   res.json(db);
// });

app.use((_: Request, res: Response) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

export default app;
