const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },                      // ✅ Removed unique
  mailId: { type: String, required: true, unique: true },     // ✅ Keep unique for email
  password: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Client', userSchema);
