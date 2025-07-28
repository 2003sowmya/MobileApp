const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Client = require('../models/clientDB'); // Make sure clientDB has name, mailId, password
const authenticateJWT = require('../middleware/authenticateJWT');

const router = express.Router();
const salt = bcrypt.genSaltSync(10);
const jwtSecret = process.env.SECRET || "your_default_secret_key"; // Fallback for local testing

// === REGISTER ===
router.post('/register', async (req, res) => {
  const { name, mailId, password, confirmPassword } = req.body;
  console.log("📥 Register Request Received:", mailId);

  if (!name || !mailId || !password || !confirmPassword) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    const existingUser = await Client.findOne({ mailId });
    if (existingUser) {
      console.log("⚠️ User already exists:", mailId);
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = new Client({ name, mailId, password: hashedPassword });
    await newUser.save();

    console.log("✅ User saved:", newUser);
    res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    console.error("🔥 Error in register:", err);
    res.status(500).json({ message: 'Server error' });
  }
});

// === LOGIN ===
router.post('/login', async (req, res) => {
  const { mailId, password } = req.body;

  try {
    const user = await Client.findOne({ mailId });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, mailId: user.mailId },
      jwtSecret,
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login successful', token });

  } catch (err) {
    console.error("🔥 Login error:", err);
    res.status(500).json({ message: 'Server error' });
  }
});

// === VERIFY TOKEN ===
router.get('/verify', authenticateJWT, async (req, res) => {
  try {
    const user = await Client.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ name: user.name, mailId: user.mailId, _id: user._id });

  } catch (err) {
    res.status(500).json({ message: 'Verification failed' });
  }
});

module.exports = router;
