const express = require("express");
const {
  loginUser,
} = require("../../controllers/users/userLoginControllers.js");

const router = express.Router();

const postLogin = router.post("/", loginUser);

module.exports = postLogin;
