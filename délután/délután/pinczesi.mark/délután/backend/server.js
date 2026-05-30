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
        console.log('Sikeres adatbázis csatlakozás!');

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
        res.status(500).json({ msg: `Valami hiba: ${error.message}` });
    }
});

// Tagállam Feltölt
app.post('/api/backend/feltolt', async (req, res) => {
    try {
        const { nev, terulet, lakossag, fovaros, fovarosLakossag, csatlakozas, haderonagysaga, zaszlo } =
            req.body;
        const newState = new State({
            nev,
            terulet,
            lakossag,
            fovaros,
            fovarosLakossag,
            csatlakozas,
            haderonagysaga,
            zaszlo,
        });
        await newState.save();

        res.status(201).json({ msg: 'Sikeres létrehozás!' });
    } catch (error) {
        res.status(500).json({ msg: `Valami hiba: ${error.message}` });
    }
});

// Tagállam Módosít
app.patch('/api/backend/modosit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { lakossag } = req.body;

        const modositottTagallam = await State.findByIdAndUpdate(
            { _id: id },
            { $set: { lakossag: lakossag } },
        );

        res.status(201).json({ msg: 'Sikeres módosítás!' });
    } catch (error) {
        res.status(500).json({ msg: `Valami hiba: ${error.message}` });
    }
});

// Tagállam Töröl
app.delete('/api/backend/torol/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await State.findByIdAndDelete({ _id: id });

        res.status(200).json({ msg: 'Sikeres törlés!' });
    } catch (error) {
        res.status(500).json({ msg: `Valami hiba: ${error.message}` });
    }
});

// Frontend tagállamok lekér
app.get('/api/frontend/tagallamok', async (req, res) => {
    try {
        const tagallamok = await State.find({});

        return res.status(200).json({ tagallamok });
    } catch (error) {
        return res.status(500).json({ msg: `Valami hiba: ${error.message}` });
    }
});

// Frontend regisztráció
app.post('/api/frontend/regisztracio', async (req, res) => {
    try {
        const { nev, email, jelszo } = req.body;

        const users = await User.find({});

        const van = users.find((elem) => elem.email === email);

        if (van) {
            return res.status(401).json({
                msg: 'Ezzel az adatokkal már van felhasználó regisztrálva!',
            });
        }

        const newUser = new User({ nev, email, jelszo });
        await newUser.save();

        return res.status(201).json({ msg: 'Sikeres regisztáció!' });
    } catch (error) {
        return res.status(500).json({ msg: `Valami hiba: ${error.message}` });
    }
});

// Frontend belépés
app.post('/api/frontend/belepes', async (req, res) => {
    try {
        const { email, jelszo } = req.body;

        const users = await User.find({});

        const van = users.find((elem) => elem.email === email);

        if (!van) {
            return res.status(401).json({
                msg: 'Ezzel az adatokkal még nincs felhasználó regisztrálva!',
            });
        }

        if (van.jelszo !== jelszo) {
            return res.status(403).json({ msg: 'Nem jó jelszót adott meg!' });
        }

        return res.status(200).json({ msg: 'Beléphet!' });
    } catch (error) {
        return res.status(500).json({ msg: `Valami hiba: ${error.message}` });
    }
});