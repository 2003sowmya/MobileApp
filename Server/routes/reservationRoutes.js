const express = require('express');
const router = express.Router();
const Reservation = require('../models/reservationDB');

// POST /api/reservation
router.post('/', async (req, res) => {
    try {
        const reservationData = req.body;
        const newReservation = await Reservation.create(reservationData);
        res.status(201).json(newReservation);
    } catch (error) {
        console.error("Reservation Error:", error);
        res.status(500).json({ message: "Failed to reserve car" });
    }
});

module.exports = router;
