const { body } = require("express-validator");
// Custom middleware to check if all required fields are present
exports.checkRequiredFields = (req, res, next) => {
  const { name, email, phone, password } = req.body;
  if (!name || !email || !phone || !password) {
    return res.status(400).json({ msg: "Please enter all required fields" });
  }
  next(); // Proceed to the next middleware if all required fields are present
};
// Registration validation rules
exports.validateRegistration = [
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("phone")
    .isLength({ min: 10, max: 10 })
    .withMessage("Please enter a valid 10-digit phone number")
    .isNumeric()
    .withMessage("Please enter a valid numeric phone number"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];
// Login validation rules
exports.validateLogin = [
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
];
