const express = require("express");
const routes = express.Router();
const userController = require("../controller/user");

const {
  checkRequiredFields,
  validateRegistration,
  validateLogin,
} = require("../validator/user");
routes.post("/register",checkRequiredFields,validateRegistration,userController.registerUser);

routes.post('/set-password', userController.setPassword);
routes.post('/verify-otp-and-register', userController.verifyOtpAndRegisterUser);
routes.post("/login", validateLogin, userController.loginUser);
module.exports = routes;
