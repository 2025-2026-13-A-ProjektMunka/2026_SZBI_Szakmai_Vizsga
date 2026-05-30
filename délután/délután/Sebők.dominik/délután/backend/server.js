const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = process.env.PORT || 3800;
const app = express();
const State = require('./models/State.js');
const User = require('./models/User.js');

app.use(express.json());
app.use(cors());

const dbConnection = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_STRING);
        console.log('Sikeresen csatlakoztál az adatbázishoz!');

        app.listen(PORT, () => {
            console.log(`http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error(`Valami hiba: ${error.message}`);
    }
};

dbConnection();

app.get('/api/backend', (req, res) => {
    try {
        res.status(200).json({ msg: 'Üdvözlünk az oldalunkon!' });
    } catch (error) {
        res.status(500).json({ msg: `Valami hibatörtént: ${error.message}` });
    }
});

app.post('/api/backend/feltolt', async (req, res) => {
    try {
        const { nev, terulet, lakossag, fovaros, fovarosLakossag, zaszlo } =
            req.body;
        const newState = new State({
            nev,
            terulet,
            lakossag,
            fovaros,
            fovarosLakossag,
            csatlakozas,
            haderoNagyasaga,
            zaszlo,
        });
        await newState.save();

        res.status(201).json({ msg: 'Sikeres létrehozás!' });
    } catch (error) {
        res.status(500).json({ msg: `Valami hiba: ${error.message}` });
    }
});
