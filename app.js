// app.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const serverless = require('serverless-http');
const socketIo = require('socket.io'); // Import socket.io

const temperatureRoutes = require('./routes/temperature'); // Import the temperature route
const Temperature = require('./models/temperature'); // Assuming this is where your temperature model is defined

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use('/temperature', temperatureRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Socket.IO setup (for real-time temperature data, can be used as part of serverless function, but limited)
let io;
if (process.env.NODE_ENV !== 'production') {
  io = socketIo();
}

// Handle temperature data submission (POST request)
app.post('/temperature', async (req, res) => {
  const { temperature } = req.body;

  try {
    const newRecord = new Temperature({ temperature });
    await newRecord.save();

    // Emit new temperature data to all connected clients
    if (io) {
      io.emit('newTemperature', newRecord);
    }

    res.status(201).json({ message: 'Temperature recorded successfully', data: newRecord });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Export the app wrapped as a serverless function
module.exports.handler = serverless(app);
