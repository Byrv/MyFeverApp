// routes/temperature.js
const express = require('express');
const Temperature = require('../models/Temprature'); // Import the Temperature model

const router = express.Router();

// Route to record temperature
router.post('/', async (req, res) => {
  const { temperature } = req.body;

  try {
    const newRecord = new Temperature({ temperature });
    await newRecord.save(); // Save the temperature record to the database

    res.status(201).json({ message: 'Temperature recorded successfully', data: newRecord });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/recent', async (req, res) => {
    try {
      // Find the latest 10 temperature records, sorted by recordedAt in descending order
      const recentTemperatures = await Temperature.find()
        .sort({ recordedAt: -1 }) // Sort by recordedAt field in descending order
        .limit(10); // Limit the results to 10 records
  
      res.status(200).json({ message: 'Recent temperatures retrieved successfully', data: recentTemperatures });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;
