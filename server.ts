import mongoose from 'mongoose';

import app from './app.ts';

const DB_HOST =
  'mongodb+srv://tarik2454:4tNelyySmiuNs9aS@cluster0.pz8jo.mongodb.net/backend-Ukrainian-House-in-Cluj?retryWrites=true&w=majority&appName=Cluster0';

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3001, () => {
      console.log('Server is running. Use our API on port: 3001');
    });
  })
  .catch(err => {
    console.log(err.message);
    process.exit(1);
  });
