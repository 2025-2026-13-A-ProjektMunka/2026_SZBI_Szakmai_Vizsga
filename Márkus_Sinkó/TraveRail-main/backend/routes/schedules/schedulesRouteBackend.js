const express = require('express');
// const pictureDeleter = require('../../middlewares/pictureDeleteFromCloudinary.js');
const {
    deleteOneScheduleBackend,
    getAllSchedulesBackend,
    getOneScheduleBackend,
} = require('../../controllers/schedules/scheduleControllersBackend.js');
const router = express.Router();

router.get('/', getAllSchedulesBackend);
router.get('/:id', getOneScheduleBackend);
router.delete('/:id', deleteOneScheduleBackend);

module.exports = router;
