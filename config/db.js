import mongoose from 'mongoose';
import config from './config.js';

const connectDB = async () => {
  try {
    const dbURI = config.database.mongodb.uri;
    const dbOptions = config.database.mongodb.options;

    mongoose.set("strictQuery", true);
    mongoose.set("strict", true);

    await mongoose.connect(dbURI, dbOptions);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }
};

export default connectDB;