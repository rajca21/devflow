import mongoose from 'mongoose';

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set('strictQuery', true);

  if (!process.env.NEXT_MONGODB_URI) {
    return console.error('Missing MongoDB connection string!');
  }

  if (isConnected) {
    return console.log('MongoDB is already connected');
  }

  try {
    await mongoose.connect(process.env.NEXT_MONGODB_URI, {
      dbName: 'devflow',
    });

    isConnected = true;
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Something went wrong while connecting to MongoDB: ' + error);
  }
};
