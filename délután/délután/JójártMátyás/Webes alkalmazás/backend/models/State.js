const mongoose = require('mongoose');

const StateSchema = new mongoose.Schema (
    {
        nev: {
            type: String,
            require: true
        },
        terulet: {
            type: Number,
            require: true
        },
        lakossag: {
            type: Number,
            require: true
        },
        fovaros: {
            type: String,
            require: true
        },
        fovarosLakossag: {
            type: Number,
            require: true
        },
        csatlakozas: {
            type: Number,
            require: true
        },
        haderoNagysaga: {
            type: Number,
            require: true
        },
        zaszlo: {
            type: Text,
            require: true
        }
    },
    { timestamps: true }
)

const StateModel = mongoose.connect('state', StateSchema);
module.exports = StateModel;