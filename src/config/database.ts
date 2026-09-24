import {env} from '../config/env';

import mongoose from 'mongoose';

const uri = env.mongoURI ;

export const connectDB = async (): Promise<void> => {
  try {
    console.log(`Connecting to MongoDB at ${uri}`);
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected (Mongoose): ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${(error as Error).message}`);
    process.exit(1);
  }
};
