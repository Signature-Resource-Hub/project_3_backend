const { validationResult } = require("express-validator");
const User = require("../models/Person");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
exports.registerUser = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    return res.status(400).json({ msg: errorMessages.join(" and ") });
  }
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ msg: "The user already exists" });
    } else {
      const saltRounds = 10;
      bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) {
          return res.status(500).json({ msg: "Internal Server Error" });
        }
        bcrypt.hash(req.body.password, salt, function (err, hash) {
          if (err) {
            return res.status(500).json({ msg: "Internal Server Error" });
          }
          req.body.password = hash;
          let newUser = User(req.body);
          newUser.save().then((user) => {
            if (user) {
              return res.status(201).json(user);
            } else {
              return res.status(400).json({ msg: "Registration failed" });
            }
          });
        });
      });
    }
  });
};
exports.loginUser = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    return res.status(400).json({ msg: errorMessages.join(" and ") });
  }
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) {
          return res.status(400).json({ msg: "Invalid credentials" });
        }
        const payload = {
          id: user._id,
          email: user.email,
          user_type: user.user_type,
        };
        jwt.sign(
          payload,
          "your_secret_key",
          { expiresIn: "1h" },
          (err, token) => {
            if (err) {
              throw err;
            }
            res.json({
              token,
              user: {
                id: user._id,
                name: user.name,
                email: user.email,
              },
            });
          }
        );
        res.cookie("token", token, { expire: new Date() + 9999 });
      });
    })
    .catch((err) => res.status(500).json({ msg: "Internal Server Error" }));
};
