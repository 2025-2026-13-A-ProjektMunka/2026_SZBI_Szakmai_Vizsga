const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3800;

app.use(express.json());
app.use(cors());

const dbConnection = async () => {
    try{
        const connection = await mongoose.connect(process.env.MONGODB_STRING)
         console.log('Sikeres adatbázis csatlakozás!');

        app.listen(PORT, () => {
            console.log(`http://localhost:${PORT}`);
        });
    }  catch (error) {
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
            haderonagysaga,
            zaszlo,
        });
        await newState.save();

        res.status(201).json({ msg: 'Sikeres létrehozás!' });
    } catch (error) {
        res.status(500).json({ msg: `Valami hiba: ${error.message}` });
    }
});


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
