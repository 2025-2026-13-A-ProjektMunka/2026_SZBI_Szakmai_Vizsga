const express = require("express");
const {
  deleteOneUserBackend,
  getAllUsersBackend,
  updateOneUserBackend,
} = require("../../controllers/users/usersControllersBackend.js");

const router = express.Router();

router.get("/", getAllUsersBackend);
router.put("/", updateOneUserBackend);
router.delete("/:id", deleteOneUserBackend);

module.exports = router;
