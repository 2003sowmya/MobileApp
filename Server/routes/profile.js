// /routes/profile.js

const express = require('express');
const router = express.Router();
const Client = require('../models/clientDB');
const authenticateJWT = require('../middleware/authenticateJWT'); // Middleware to check if the user is authenticated

// Get user profile details (GET request)
router.get('/', authenticateJWT, async (req, res) => {
  try {
    const client = await Client.findById(req.user.id);
    if (!client) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send back client data (displayName, username as email)
    res.json({
      displayName: client.displayName,
      username: client.username, // This is email (read-only)
    });
  } catch (err) {
    console.error("Error fetching profile", err);
    res.status(500).json({ message: "Error fetching profile" });
  }
});

// Update user profile details (PUT request)
router.put('/', authenticateJWT, async (req, res) => {
  const { displayName } = req.body; // Only allow updating displayName

  try {
    const client = await Client.findByIdAndUpdate(
      req.user.id, 
      { displayName }, // Update only displayName
      { new: true }
    );

    if (!client) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return updated profile data
    res.json({
      message: "Profile updated",
      displayName: client.displayName,
      username: client.username, // Email (read-only)
    });
  } catch (err) {
    console.error("Error updating profile", err);
    res.status(500).json({ message: "Error updating profile" });
  }
});

module.exports = router;
