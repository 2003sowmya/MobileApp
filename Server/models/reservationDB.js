const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    age: { type: Number, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    zipcode: { type: String, required: true },
    carType: { type: String, required: true },
    pickPlace: { type: String, required: true },
    dropPlace: { type: String, required: true },
    pickDate: { type: Date, required: true },
    dropDate: { type: Date, required: true },
    pickTime: { type: String, required: true },
    dropTime: { type: String, required: true }
}, { timestamps: true });

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
