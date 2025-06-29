import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import connectMongoDB from './db/connectMongoDB.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use("/api/auth",authRoutes);
app.listen(PORT, () => {
  console.log('Server is running on port 3000');
  connectMongoDB();
});