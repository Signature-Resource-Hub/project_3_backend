const express = require("express");
const routes = express.Router();
const userController = require("../controller/user");
const {
  checkRequiredFields,
  validateRegistration,
  validateLogin,
} = require("../validator/user");
routes.post(
  "/register",
  checkRequiredFields,
  validateRegistration,
  userController.registerUser
);
routes.post("/login", validateLogin, userController.loginUser);
module.exports = routes;
