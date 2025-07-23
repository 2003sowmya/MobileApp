require('dotenv').config(); // Load .env
const mongoose = require('mongoose');
const Car = require('./models/carsDB');

const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
  console.error("Error: MongoDB connection string not provided in .env file.");
  process.exit(1);
}

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB successfully.");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  });

const cars = [
  { name: "Audi A1", model: "Audi", rent: "$45", image: "realaudi.png" },
  { name: "Golf 6", model: "VW", rent: "$37", image: "realgolf.png" },
  { name: "Toyota", model: "Camry", rent: "$30", image: "realtoyota.png" },
  { name: "BMW 320", model: "ModernLine", rent: "$35", image: "realbmw.png" },
  { name: "Mercedes", model: "Benz GLK", rent: "$50", image: "realbenz.png" },
  { name: "NW Passat", model: "CC", rent: "$25", image: "realpassat.png" }
];

console.log("Starting to delete existing cars data...");
Car.deleteMany({})
  .then(() => {
    console.log("Deleted existing car data. Now seeding new data...");
    return Car.insertMany(cars); // Insert the new cars data
  })
  .then(() => {
    console.log("Cars seeded successfully.");
  })
  .catch((err) => {
    console.error("Seeding failed:", err);
  })
  .finally(() => {
    mongoose.disconnect(); // Ensures disconnection happens after seeding
  });
