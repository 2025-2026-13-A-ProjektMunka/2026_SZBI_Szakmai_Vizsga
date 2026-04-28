const express = require('express');
// const pictureDeleter = require('../../middlewares/pictureDeleteFromCloudinary.js');
const { getAllSchedulesFrontend, getOneScheduleFrontend } = require('../../controllers/schedules/scheduleControllersFrontend.js');
const router = express.Router();

router.get('/', getAllSchedulesFrontend);
router.get('/:id', getOneScheduleFrontend);

module.exports = router;