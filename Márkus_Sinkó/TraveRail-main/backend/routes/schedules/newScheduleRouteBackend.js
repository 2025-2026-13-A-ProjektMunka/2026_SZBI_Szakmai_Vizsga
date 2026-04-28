const express = require("express");
// const pictureUploader = require("../../middlewares/pictureToCloudinary.js");
const {
  getNewSchedule,
  postNewSchedule,
} = require("../../controllers/schedules/newScheduleControllersBackend.js");
const router = express.Router();

router.get("/", getNewSchedule);
router.post("/", postNewSchedule);

module.exports = router;
