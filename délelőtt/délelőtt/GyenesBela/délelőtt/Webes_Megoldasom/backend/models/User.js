const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        nev: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        jelszo: { type: String, required: true },
    },
    { timestamps: true }
);

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;