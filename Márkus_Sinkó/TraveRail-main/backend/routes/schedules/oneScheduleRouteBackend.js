const express = require('express');
const {
    updateOneScheduleBackend,
    getOneScheduleBackend,
} = require('../../controllers/schedules/oneScheduleControllersBackend.js');
const router = express.Router();

router.get('/:id', getOneScheduleBackend);
router.put('/:id', updateOneScheduleBackend);

module.exports = router;
