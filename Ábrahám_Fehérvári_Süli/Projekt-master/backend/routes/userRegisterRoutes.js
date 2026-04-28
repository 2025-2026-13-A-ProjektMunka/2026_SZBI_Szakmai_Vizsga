const express = require('express');
const { registerUser } = require('../controllers/userRegisterControllers.js');
const router = express.Router();

router.post('/', registerUser);

module.exports = router;