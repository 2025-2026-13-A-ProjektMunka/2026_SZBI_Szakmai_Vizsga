// routes/userProfileRoutes.js
const express = require('express');
const router = express.Router();
const {getProfile, updateProfile} = require('../backend/controllers/userProfileController.js');

// Feltételezzük, hogy a hitelesítő middleware itt található
const { protect } = require('../backend/middlewares/authMiddleware.js'); 

// Mivel a server.js-ben az útvonalat /myprofile-ra állítottuk be, itt csak / kell
// /myprofile GET: Profil oldal megjelenítése
router.get('/', protect, getProfile);

// /myprofile POST: Profil adatok frissítése
router.post('/', protect, updateProfile);

module.exports = router;