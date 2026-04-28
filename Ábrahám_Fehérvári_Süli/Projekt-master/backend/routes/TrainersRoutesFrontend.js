const express = require('express');
const {
    getAllTrainersFrontend,
    // ÚJ IMPORT: Ezt a funkciót kell majd hozzáadnod a controller fájlban
    getTrainerByIdFrontend, 
} = require('../controllers/TrainersControllerFrontend.js');
const router = express.Router();

// Meglévő útvonal: Minden edző listázása
router.get('/', getAllTrainersFrontend);

// ÚJ ÚTVONAL: Egyedi edző lekérése ID alapján
router.get('/:id', getTrainerByIdFrontend); 

module.exports = router;