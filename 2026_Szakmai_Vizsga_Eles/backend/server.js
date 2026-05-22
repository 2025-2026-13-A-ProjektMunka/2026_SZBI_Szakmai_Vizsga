const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = process.env.PORT || 3800;
const app = express();
const Country = require('./models/Country.js');
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

// Tagország Feltölt
app.post('/api/backend/feltolt', async (req, res) => {
    try {
        const {
            nev,
            terulet,
            lakossag,
            fovaros,
            fovarosLakossag,
            csatlakozas,
            hivatalosNyelv,
            zaszlo,
        } = req.body;

        const newCountry = new Country({
            nev,
            terulet,
            lakossag,
            fovaros,
            fovarosLakossag,
            csatlakozas,
            hivatalosNyelv,
            zaszlo,
        });

        await newCountry.save();

        res.status(201).json({ msg: 'Sikeres létrehozás!' });
    } catch (error) {
        res.status(500).json({ msg: `Valami hiba: ${error.message}` });
    }
});

// Tagország Módosít
app.patch('/api/backend/modosit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { lakossag } = req.body;

        const modositottTagallam = await Country.findByIdAndUpdate(
            { _id: id },
            { $set: { lakossag: lakossag } },
        );

        res.status(201).json({ msg: 'Sikeres módosítás!' });
    } catch (error) {
        res.status(500).json({ msg: `Valami hiba: ${error.message}` });
    }
});

// Tagország Töröl
app.delete('/api/backend/torol/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Country.findByIdAndDelete({ _id: id });

        res.status(200).json({ msg: 'Sikeres törlés!' });
    } catch (error) {
        res.status(500).json({ msg: `Valami hiba: ${error.message}` });
    }
});

// Frontend tagországok lekér
app.get('/api/frontend/tagorszagok', async (req, res) => {
    try {
        const tagorszagok = await Country.find({});

        return res.status(200).json({ tagorszagok });
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

// ******************************************************************************
// const path = require('node:path');
// const fsPromises = require('node:fs/promises');

// app.post('/feltolt', async (req, res) => {
//     try {
//         const adatok = await fsPromises.readFile(
//             path.resolve(__dirname, '..', 'eu_tagorszagok_zaszlokkal.txt'),
//             { encoding: 'utf-8' },
//         );
//         const varosok = adatok.split('\n');
//         for (let i = 0; i < varosok.length; i++) {
//             const item = varosok[i].split(';');
//             // const { megye, megyeSzekhely, lakossag, varoshaza } = req.body;
//             // const newCity = new City({ megye, megyeSzekhely, lakossag, varoshaza });
//             const newCountry = new Country({
//                 nev: item[0],
//                 terulet: Number(item[1]),
//                 lakossag: Number(item[2]),
//                 fovaros: item[3],
//                 fovarosLakossag: Number(item[4]),
//                 csatlakozas: Number(item[5]),
//                 hivatalosNyelv: item[6],
//                 zaszlo: item[7],
//             });
//             // console.log(newCountry);
//             await newCountry.save();
//         }
//         res.status(201).json({ msg: 'Sikeres létrehozás!' });
//     } catch (error) {
//         res.status(500).json({ msg: `Valami hiba: ${error.message}` });
//     }
// });
