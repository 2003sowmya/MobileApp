// index.js
require('dotenv').config();
const express = require('express');
const connectDB = require('./db/connect');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
connectDB();

// Use Auth Routes (register, login, verify)
app.use('/api', authRoutes);

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
