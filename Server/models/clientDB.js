const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const passportLocalMongoose = require('passport-local-mongoose');

const clientSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true }
});

// Attach Passport Local Mongoose plugin for easy authentication
clientSchema.plugin(passportLocalMongoose);

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
