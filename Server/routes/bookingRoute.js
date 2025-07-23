const express = require('express');
const router = express.Router();
const Reservation = require('../models/reservationDB');
const authenticateUser = require('../middleware/auth'); // Assuming you have authentication middleware

// GET /api/bookings - Fetch all bookings for the authenticated user
router.get('/', authenticateUser, async (req, res) => {
    try {
        const userId = req.user.id;  // Get the authenticated user's ID from the request object

        // Find all reservations associated with the authenticated user
        const bookings = await Reservation.find({ userId });

        res.status(200).json(bookings);  // Return the user's bookings
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ message: 'Failed to fetch bookings' });
    }
});

module.exports = router;
