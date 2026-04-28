// trainersControllersFrontend.js

const Trainer = require('../models/Trainer');

exports.getAllTrainersFrontend = async (req, res) => {
    try {
        const trainers = await Trainer.find({});
        return res.json({ trainers });
    } catch (err) {
        res.status(500).json({
            message: 'Hiba az edzők lekérésekor',
            error: err.message,
        });
    }
};

// ÚJ FÜGGVÉNY: Egyedi edző lekérése ID alapján
exports.getTrainerByIdFrontend = async (req, res) => {
    // 1. Kiolvassuk az ID-t az URL paraméterből
    const trainerId = req.params.id; 

    try {
        // 2. Keresés az adatbázisban az ID alapján (kizárva az érzékeny adatokat, pl. jelszót)
        // A .select('-password') a jelszó mező kihagyására szolgál, ha van ilyen a modellben.
        const trainer = await Trainer.findById(trainerId).select('-password'); 

        if (!trainer) {
            // Ha az ID nem található az adatbázisban
            return res.status(404).json({ msg: 'Edző nem található!' });
        }

        // 3. Visszaküldjük az edző adatait
        return res.status(200).json({ trainer });
        
    } catch (error) {
        // Hiba kezelése, pl. ha az ID formátuma nem MongoDB ObjectId
        if (error.kind === 'ObjectId') {
             return res.status(400).json({ msg: 'Érvénytelen ID formátum!' });
        }
        console.error(error);
        res.status(500).json({ msg: 'Szerverhiba az edző lekérésekor.' });
    }
};

// Megjegyzés: Ha a module.exports-ot alul használod, akkor ott kell exportálni:
/*
module.exports = {
    getAllTrainersFrontend,
    getTrainerByIdFrontend 
};
*/
// Mivel a jelenlegi kódod exports.getAllTrainersFrontend = ... formátumot használ,
// az exports.getTrainerByIdFrontend = ... sor automatikusan exportálja a függvényt.