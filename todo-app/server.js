import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env

import mongoose from 'mongoose'; 
import express from 'express';
import connectDB from './config/db.js';

import { authRoutes } from './routes/authRoutes.js';
import { todoRoutes } from './routes/todoRoutes.js';

console.log("MONGO_URI:", process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
