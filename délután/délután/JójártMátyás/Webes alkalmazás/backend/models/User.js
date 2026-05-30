const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema (
    {
        nev: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true,
            unique: true
        },
        jelszo: {
            type: String,
            require: true
        }
    },
    { timestamps: true }
)

const UserModel = mongoose.connect('user', UserSchema);
module.exports = UserModel;