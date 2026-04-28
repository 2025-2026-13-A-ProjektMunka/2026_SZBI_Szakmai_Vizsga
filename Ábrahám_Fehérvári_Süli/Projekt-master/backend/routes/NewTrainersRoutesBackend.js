const express = require('express');
const pictureUploader = require('../middlewares/pictureUpload.js');
const { postNewTrainersBackend, getNewTrainersBackend } = require('../controllers/NewTrainersControllerBackend.js');


const router = express.Router();

router.get('/', getNewTrainersBackend);
router.post('/', pictureUploader, postNewTrainersBackend);

module.exports = router;
