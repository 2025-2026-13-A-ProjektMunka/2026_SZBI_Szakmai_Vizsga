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

app.post('/api/backend/feltolt', async (req, res) => {
    try {
        const { nev, terulet, lakossag, fovaros, fovarosLakossag, csatlakozás, zaszlo } =
            req.body;
        const newState = new State({
            "név": "Egyesült Államok",
            "terület": 9833520,
            "lakosság": 340000000,
            "főváros": "Washington D.C.",
            "főváros lakossága": 690000,
            "csatlakozás": 1949,
            "haderő nagysága": 1328000
        });
        await newState.save();
    
    } catch(error){
         res.status(500).json({ msg: `Valami hiba: ${error.message}` });
    }
 }
)


app.delete('/api/backend/feltolt', async (req, res) => {
    try {
        const { zaszlo } =
            req.body;
        const delateState =  State({
            "zaszlo":"https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg "
        });
        await delateState.save();
    
    } catch(error){
         res.status(500).json({ msg: `Valami hiba: ${error.message}` });
    }
 }
)


app.patch('/api/backend/feltolt', async (req, res) => {
    try {
        const { csatlakozás} =
            req.body;
        const newState = new State({
            "csatlakozás": "2009"
        });
        await newState.save();
    
    } catch(error){
         res.status(500).json({ msg: `Valami hiba: ${error.message}` });
    }
 }
)

