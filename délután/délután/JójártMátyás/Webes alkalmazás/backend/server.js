const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const PORT = process.env.PORT || 3800;
const app = express();

app.use(express.json());
app.use(cors());

const dbConnection = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_STRING);
        console.log('Sikeres adatbázis csatlakozás!');
        app.listen(PORT, () => {
            console.log(`http://localhost:${PORT}/api`);
        })
    } catch (error) {
        console.error(`Valami hiba: ${error.message}`);
    }
}

dbConnection();