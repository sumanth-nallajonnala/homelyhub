const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDatabase = require('./config/database');

// Load environment variables
dotenv.config();

// Connect to database
connectDatabase();

// Initialize express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/properties', require('./routes/propertyRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));

// Test route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'HomelyHub API is running!'
  });
});

// Error handler middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : null
  });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});