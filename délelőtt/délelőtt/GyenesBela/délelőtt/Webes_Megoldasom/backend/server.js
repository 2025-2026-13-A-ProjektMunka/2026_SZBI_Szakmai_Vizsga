// Csomag importok
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3800;

const app = express();
app.use(express.json());
app.use(cors());

// Modell importok
const Country = require('./models/Country');
const User = require('./models/User');

// Adatbázis csatlakozás
const mongoConnect = () => {
    try {
        const connection = mongoose.connect(process.env.MONGODB_STRING);
        console.log("Sikeres csatlakozás az adatbázishoz.")

        app.listen(PORT, () => {
            console.log(`Backend szerver a http://localhost:${PORT} címen fut.`)
        });
    } catch (error) {
        console.error("Hiba az adatbázis csatlakoztatásakor.")
    }
}
mongoConnect();

// Adatbázishoz való csatlakozás tesztelése
app.get('/api/backend', (req, res) => {
    try {
        res.status(200).json({ msg: `Sikeres csatlakozás.` })
    } catch (error) {
        res.status(500).json({ msg: `Hiba történt: ${error.message}` })
    }
})

// Ország hozzáadása
app.post('/api/backend/upload', async (req, res) => {
    try {
        const { nev, terulet, lakossag, fovaros, fovarosLakossag, csatlakozas, hivatalosNyelv, zaszlo } = req.body;
        const newCountry = new Country({ nev, terulet, lakossag, fovaros, fovarosLakossag, csatlakozas, hivatalosNyelv, zaszlo })
        await newCountry.save();
        res.status(200).json({ msg: `Sikeres feltöltés!` })
    } catch (error) {
        res.status(500).json({ msg: `Hiba történt feltöltéskor: ${error.message}` })
    }
})

// Ország törlése
app.delete('/api/backend/delete', async (req, res) => {
    try {
        const { nev } = req.body;
        await Country.findOneAndDelete({ nev });
        res.status(200).json({ msg: `Sikeres törlés.` })
    } catch (error) {
        res.status(500).json({ msg: `Hiba történt: ${error.message}` })
    }
})

// Tagállam lakosságának frissítése
app.patch('/api/backend/update', async (req, res) => {
    try {
        const { nev, ujLakossag } = req.body;
        await Country.findOneAndUpdate({nev} , {lakossag: ujLakossag})
        res.status(200).json({ msg: `Sikeres lakosság módosítás!` })
    } catch (error) {
        res.status(500).json({ msg: `Hiba történt: ${error.message}` })
    }
})

// Regisztráció
app.post('/api/frontend/register', async (req, res) => {
    try {
        const { nev, email, jelszo } = req.body;

        const felhasznalok = await User.find({});
        const letezikE = felhasznalok.find(elem => elem.email === email);

        if (letezikE) { res.status(500).json({ msg: `Már létezik ilyen felhasználó!` }) }

        const newUser = new User({ nev, email, jelszo });
        await newUser.save();
        res.status(200).json({ msg: `Sikeres regisztráció!` })
    } catch (error) {
        res.status(500).json({ msg: `Hiba történt: ${error.message}` })
    }
})

// Bejelentkezés
app.post('/api/frontend/login', async (req, res) => {
    try {
        const { email, jelszo } = req.body;
        const felhasznalok = await User.find({});
        const jo = felhasznalok.find(elem => elem.email === email && elem.jelszo === jelszo);
        if (!jo) { res.status(500).json({ msg: `Hibás adatokat adtál meg!` }) }
        res.status(200).json({ msg: `Sikeres bejelentkezés!` })
    } catch (error) {
        res.status(500).json({ msg: `Hiba történt: ${error.message}` })
    }
})

// Tagországok lekérése
app.get('/api/frontend/download', async (req, res) => {
    try {
        const countries = await Country.find({});
        res.status(200).json({ countries })
    } catch (error) {
        res.status(500).json({ msg: `Tagállamok lekérése sikertelen.` })
    }
})

// app.('/api/backend', async (req, res) => {
//     try {
//         res.status(200).json({ msg: `Sikeres ...` })
//     } catch (error) {
//         res.status(500).json({ msg: `Hiba : ${error.message}` })
//     }
// })