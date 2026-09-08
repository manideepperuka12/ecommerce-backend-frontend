import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const dbUrl = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ecommerce';
    
    // Explicitly add dbName inside options to eliminate string parsing errors
    const conn = await mongoose.connect(dbUrl, {
      dbName: 'ecommerce' 
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
