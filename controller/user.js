const { validationResult } = require("express-validator");
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


exports.verifyOtpAndRegisterUser = async (req, res) => {
  console.log('Request body:', req.body);
  const { otp, userData } = req.body;
  
  // Hardcoded OTP for demonstration
  const correctOtp = '1234';
  
  if (otp !== correctOtp) {
    return res.status(400).json({ status: "error", msg: "Invalid OTP" });
  }
  
  try {
    const existingUser = await User.findOne({ email: userData.email });
    if (!existingUser) {
      return res.status(400).json({ status: "error", msg: "User not found" });
    }
  
    existingUser.status = 'verified'; // Update status to 'verified'
    await existingUser.save();
  
    return res.status(200).json({ status: "success", msg: "User verified successfully" });
  } catch (error) {
    console.error('Error verifying user:', error);
    return res.status(500).json({ status: "error", msg: "Internal Server Error" });
  }
};
exports.setPassword = async (req, res) => {
  const { password, userData } = req.body;

  try {
    const user = await User.findOne({ email: userData.email });
    if (!user) {
      return res.status(400).json({ status: "error", msg: "User not found" });
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    user.status = 'verified';
    await user.save();

    return res.status(200).json({ status: "success", msg: "Password set successfully" });
  } catch (error) {
    console.error('Error setting password:', error);
    return res.status(500).json({ status: "error", msg: "Internal Server Error" });
  }
};


let temporaryUserStore = {}; // In-memory store for demonstration



exports.registerUser = async (req, res) => {
  console.log('Request body:', req.body); // Log the request body
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      return res.status(400).json({ status: "error", msg: errorMessages.join(" and ") });
    }

    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ status: "error", msg: "Please enter all required fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ status: "error", msg: "The user already exists" });
    }
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    req.body.password = hashedPassword;
    req.body.status="approved"
    let newUser=User(req.body)

    await newUser.save().then((data) => {
      if (data) {
        return res.status(201).json({ status: "approved", msg: "User registered successfully", data });
      } else {
        return res.status(400).json({ status: "error", msg: "Error Occurred" });
      }
    });
  } catch (error) {
    console.error('Error during user registration:', error);
    return res.status(500).json({ status: "error", msg: "Internal Server Error" });
  }
};
exports.loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      return res.status(400).json({ status: "error", msg: errorMessages.join(" and ") });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ status: "error", msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ status: "error", msg: "Invalid credentials" });
    }

    const payload = {
      id: user._id,
      email: user.email,
      user_type: user.user_type,
    };

    jwt.sign(payload, "your_secret_key", { expiresIn: "1h" }, (err, token) => {
      if (err) {
        throw err;
      }
      res.cookie("token", token, { expire: new Date() + 9999 });
      return res.json({
        status: "success",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: "error", msg: "Internal Server Error" });
  }
};
