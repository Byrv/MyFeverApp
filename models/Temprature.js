// models/Temperature.js
const mongoose = require('mongoose');

const temperatureSchema = new mongoose.Schema({
  temperature: {
    type: Number,
    required: true,
  },
  recordedAt: {
    type: Date,
    default: Date.now, // Automatically sets the current date and time
  },
});

const Temperature = mongoose.model('Temperature', temperatureSchema);

module.exports = Temperature;
