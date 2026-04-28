const express = require('express');
const { getMain } =  require('../controllers/mainControllersBackend.js');
const router = express.Router();

router.get('/', getMain);

module.exports = router;