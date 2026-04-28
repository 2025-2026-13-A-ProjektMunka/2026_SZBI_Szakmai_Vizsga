const express = require('express');
const {
    getAllTrainers,
    getTrainerById,
    createTrainer,
    updateTrainer,
    deleteTrainer,
} = require('../controllers/TrainersControllerBackend.js');
const pictureDeleter = require('../middlewares/pictureDelete.js');

const router = express.Router();

router.get('/', getAllTrainers);
router.get('/:id', getTrainerById);
// router.get('/', createTrainer);
router.put('/:id', updateTrainer);
router.delete('/:id', pictureDeleter, deleteTrainer);

module.exports = router;
