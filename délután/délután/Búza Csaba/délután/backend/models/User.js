const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    nev: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    jelszo: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', UserSchema);