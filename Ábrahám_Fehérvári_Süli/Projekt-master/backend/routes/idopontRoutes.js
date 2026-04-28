const express = require('express');
const { updateIdopont, cancelIdopont } = require('../controllers/idopontControllers.js'); // cancelIdopont importálva
const router = express.Router();

router.put('/:id', updateIdopont);

// ÚJ ÚTVONAL: Időpont Lemondása foglalás ID alapján
router.delete('/:reservationId', cancelIdopont);

module.exports = router;