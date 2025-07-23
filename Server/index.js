// index.js
require('dotenv').config(); // Ensure environment variables are loaded
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Middleware for JWT Authentication
const authenticateJWT = require('./middleware/authenticateJWT');

// Initialize Express app
const app = express();

// Configuration
const Port = process.env.PORT || 5000;
const jwtSecret = process.env.SECRET;
const salt = bcrypt.genSaltSync(5);

// Middleware setup
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:5173", // Frontend URL
    credentials: true
}));
app.use(cookieParser());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("🚀 Connected to the database"))
    .catch((err) => console.log("🔥 Database connection error:", err));

// Models
const Client = require('./models/clientDB');
const Reservation = require('./models/reservationDB');

// Register Route
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const userExist = await Client.findOne({ username });
        if (userExist) {
            return res.status(422).json({ error: "Email already exists" });
        }

        const hashedPassword = bcrypt.hashSync(password, salt);
        const client = new Client({ username, password: hashedPassword });
        await client.save();
        res.json(client);

    } catch (err) {
        console.error("🔥 Registration error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Login Route
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const clientExist = await Client.findOne({ username });
        if (!clientExist) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const passOk = bcrypt.compareSync(password, clientExist.password);
        if (!passOk) {
            return res.status(401).json({ success: false, message: "Incorrect password" });
        }

        const token = jwt.sign(
            { id: clientExist._id, username: clientExist.username },
            jwtSecret,
            { expiresIn: '1h' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'Lax',
            secure: process.env.NODE_ENV === 'production'
        }).status(200).json({
            success: true,
            message: "Login successful",
            user: { id: clientExist._id, username: clientExist.username }
        });

    } catch (err) {
        console.error("🔥 Login error:", err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// Logout Route
app.post('/api/logout', (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        sameSite: 'Lax',
        secure: process.env.NODE_ENV === 'production'
    }).status(200).json({ message: "Logged out successfully" });
});

// Verify Token Route
app.get('/api/verify', (req, res) => {
    const { token } = req.cookies;

    if (!token) return res.status(401).json({ message: "Unauthorized - No token provided" });

    jwt.verify(token, jwtSecret, async (err, clientData) => {
        if (err) {
            console.error("🔥 Token verification error:", err);
            return res.status(403).json({ message: "Invalid or expired token" });
        }

        const client = await Client.findById(clientData.id);
        if (!client) return res.status(404).json({ message: "No user found" });

        res.json({ username: client.username, _id: client._id });
    });
});

// Update Profile Route
app.put('/api/profile', authenticateJWT, async (req, res) => {
    const { username, password } = req.body;
    const userId = req.user.id;

    try {
        const updateData = { username };

        if (password && password.trim() !== '') {
            const hashedPassword = bcrypt.hashSync(password, salt);
            updateData.password = hashedPassword;
        }

        const updatedUser = await Client.findByIdAndUpdate(userId, updateData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({
            _id: updatedUser._id,
            username: updatedUser.username
        });
    } catch (error) {
        console.error("🔥 Profile update error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Create Reservation Route
app.post('/api/reservation', authenticateJWT, async (req, res) => {
    const {
        carType, pickPlace, dropPlace, pickDate, dropDate,
        pickTime, dropTime, firstname, lastname, age, phone, email, address, city, zipcode
    } = req.body;

    const clientId = req.user.id;

    try {
        const reservation = new Reservation({
            owner: clientId,
            firstname, lastname, age, phone, email,
            address, city, zipcode,
            carType, pickPlace, dropPlace,
            pickDate, dropDate, pickTime, dropTime
        });

        await reservation.save();
        res.json(reservation);

    } catch (error) {
        console.error("🔥 Reservation error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Get Reservations Route
app.get('/api/bookings', authenticateJWT, async (req, res) => {
    const userId = req.user.id;
    try {
        const reservations = await Reservation.find({ owner: userId });
        if (!reservations.length) {
            return res.status(404).json({ message: "No bookings found" });
        }
        res.json(reservations);
    } catch (error) {
        console.error("🔥 Booking retrieval error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Cancel Reservation Route
app.post('/api/cancel', authenticateJWT, async (req, res) => {
    const { bookingId } = req.body;
    try {
        const reservation = await Reservation.findOneAndDelete({ _id: bookingId });
        if (reservation) {
            res.json({ message: "Booking canceled successfully" });
        } else {
            res.status(404).json({ message: "Booking not found" });
        }
    } catch (error) {
        console.error("🔥 Cancellation error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Update Booking Route
app.put('/api/bookings/:id', authenticateJWT, async (req, res) => {
    const bookingId = req.params.id;
    try {
        const updatedBooking = await Reservation.findByIdAndUpdate(bookingId, req.body, { new: true });
        if (!updatedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.json(updatedBooking);
    } catch (error) {
        console.error("🔥 Update error:", error);
        res.status(500).json({ message: "Error updating booking" });
    }
});

// Start the server
app.listen(Port, '0.0.0.0', () => {
    console.log(`🚀 Server started on port ${Port}`);
});
