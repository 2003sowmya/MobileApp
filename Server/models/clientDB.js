const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },       // Changed from username
  mailId: { type: String, required: true, unique: true },     // Changed from email
  password: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Client', userSchema);  // Make sure this matches in register.js
