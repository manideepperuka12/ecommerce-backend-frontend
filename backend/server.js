import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

// 1. Initialise and load environment variables first
dotenv.config();

// 2. Establish database connection pipeline
connectDB();

const app = express();

// 3. Middlewares configurations Matrix
app.use(cors());
app.use(express.json());

// 4. API Endpoints router map registries
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// 5. Open up application network listener portal port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running smoothly on port ${PORT}`));
