// routes/updateRoutes.js
const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking'); // Adjust as necessary

// PUT /api/update/bookings/:id
router.put('/bookings/:id', async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(updatedBooking);
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({ message: 'Server error while updating booking' });
  }
});

module.exports = router;
