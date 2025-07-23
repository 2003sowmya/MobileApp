const express = require('express');
const router = express.Router();
const Car = require('../models/Car'); // Import Car model

// Fetch all cars from MongoDB
router.get('/api/cars', async (req, res) => {
  try {
    const cars = await Car.find(); // Get all car records
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: "Error fetching car data" });
  }
});

module.exports = router;
