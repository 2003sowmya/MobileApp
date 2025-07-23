const mongoose = require('mongoose');

// Define the car schema
const carSchema = new mongoose.Schema({
  name: { type: String, required: true },  // Required field
  model: { type: String, required: true }, // Required field
  rent: { type: String, required: true },  // You can change this to Number if needed
  image: { type: String, required: true }  // Required field
});

// Create a model based on the car schema
const Car = mongoose.model('Car', carSchema);

// Export the Car model
module.exports = Car;
