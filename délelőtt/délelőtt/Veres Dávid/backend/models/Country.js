const mongoose = require("mongoose");
const countrySchema = new mongoose.Schema (
    {
        nev: {
            type: String,
            required: true
        },
        terulet: {
            type: Number,
            required: true
        },
        lakossag: {
            type: Number,
            required: true
        },
        fovaros: {
            type: String,
            required: true
        },
        fovarosLakossag: {
            type: Number,
            required: true
        },
        csatlakozas: {
            type: Number,
            required: true
        },
        hivatalosNyelv: {
            type: String,
            required: true
        },
        zaszlo: {
            type: Text,
            required: true
        },
    },
    {timestamps: true}
);

const CountryModel = mongoose.model("country", countrySchema)
module.exports = CountryModel;