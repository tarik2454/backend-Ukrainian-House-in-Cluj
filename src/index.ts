import mongoose from 'mongoose';
import 'dotenv/config';

import app from './app';

const dbHost = process.env.DB_HOST;

if (!dbHost) {
  throw new Error('Environment variable DB_HOST is not defined');
}

mongoose
  .connect(dbHost)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('Server is  running. Use our API on port: 3001');
    });
  })
  .catch(err => {
    console.log(err.message);
    process.exit(1);
  });
