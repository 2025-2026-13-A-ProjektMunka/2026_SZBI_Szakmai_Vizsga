const mongoose = require('mongoose');
const User = require('./User');

const UserSchema = new mongoose.Schema({
    nev: {
        type: String,
        require: true,
    },

    email: {
        type: String,
        require: true,
    },
    jelszo: {
        type: String,
        require: true,
    },


 }, {timestamps: true}
);


module.exports = mongoose.model('User', UserSchema);
