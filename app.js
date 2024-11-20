const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const temperatureRoutes = require('./routes/temperature'); // Import the temperature route

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://my-fever-app-front-end.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use('/api/temperature', temperatureRoutes);

app.get('/', (req, res) => {
  res.send('Hello');
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Start server on localhost
const PORT = process.env.PORT || 80; // Default to 5000 if no port is specified in environment variables

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
