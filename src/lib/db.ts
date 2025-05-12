import mongoose, {connect} from "mongoose";

if (!process.env.MONGO_URL) {
  throw new Error('Invalid environment variable: MONGO_URL');
}

let connection: any = null;

export const connectDB = async (): Promise<mongoose.Connection> => {
  try {
    connection = connection ?? await connect(process.env.MONGO_URL ?? '');
    console.log('MongoDB connected');
    return connection;
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};