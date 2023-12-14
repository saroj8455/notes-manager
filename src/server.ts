import * as dotenv from 'dotenv';
import app from './app';
import mongoose from 'mongoose';

// Configuration ENV
dotenv.config();

const PORT = process.env.PORT || 8004;
const startApp = async () => {
  try {
    // Connect to MongoDB database
    const connectionUrl = process.env.REMOTEURI ? process.env.REMOTEURI : '';
    const conn = await mongoose.connect(connectionUrl);
    console.log(`Connected to Remote Host : ${conn.connection.host}`);
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running under http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log('Unable to start App', error);
    process.exit(1);
  }
};

// Run the server once connected successfuly to remote db
startApp();
