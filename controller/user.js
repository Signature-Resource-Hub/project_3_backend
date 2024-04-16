const { validationResult } = require("express-validator");
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      return res.status(400).json({ status: "error", msg: errorMessages.join(" and ") });
    }

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ status: "error", msg: "The user already exists" });
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({ ...req.body, password: hashedPassword });
    const user = await newUser.save();

    return res.status(201).json({ status: "success", user });
  } catch (error) {
    console.error(error);
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
