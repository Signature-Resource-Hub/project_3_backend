const User = require("../model/user");
const bcrypt = require("bcryptjs"); // Import bcryptjs for password hashing
const { use } = require("../routes/user-update");
const mongoose =require ("mongoose")

//forgot  password
exports.forgotPassword = (req, res) => {
  const { email, newPassword } = req.body;
  console.log(req.body);
  // Trim whitespace from the new password
  const trimmedPassword = newPassword.trim();
  // Validate new password
  if (!trimmedPassword) {
    return res.status(400).json({ msg: "Please enter a password" });
  }
  if (trimmedPassword.length < 8) {
    return res
      .status(400)
      .json({ msg: "Password must be at least 8 characters long" });
  }
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
      // Generate salt and hash for the new password
      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(trimmedPassword, salt, (err, hash) => {
          if (err) throw err;
          // Set the new hashed password
          user.password = hash;
          // Save the updated user with the new password
          console.log(trimmedPassword);
          console.log(hash);
          user
            .save()
            .then(() => {
              res.status(200).json({ msg: "Password updated successfully" });
            })
            .catch((err) => {
              res
                .status(500)
                .json({ msg: "Failed to update password", error: err });
            });
        });
      });
    })
    .catch((err) => {
      res.status(500).json({ msg: "Internal Server Error", error: err });
    });
};

//profile updation

// Update username
exports.updateUser = (req, res) => {
  console.log(req.body);
  const { name, email } = req.body;
  // Validate username
  if (!name || name.length > 52) {
    return res.status(400).json({ msg: "Invalid username" });
  }
  // Check if name is empty
  if (!name.trim()) {
    return res.status(400).json({ msg: "Name field cannot be empty" });
  }
  // Update username in the database
  User.findOneAndUpdate({ email }, { name }, { new: true })
    .then((user) => {
      if (user) {
        console.log("User updated successfully:", user);
        res.status(200).json(user);
      } else {
        console.log("User not found for update. Email:", email);
        return res
          .status(404)
          .json({ msg: "User not found for update", email: email });
      }
    })
    .catch((error) => {
      // Handle any error that occurred during the update operation
      console.error("Error updating user:", error);
      return res
        .status(500)
        .json({ msg: "Server Error", error: error.message });
    });
};

// Update email
exports.updateEmail = (req, res) => {
  const { userId, email, newEmail } = req.body;
  // Validate email
  if (!email || !isValidEmail(email)) {
      return res.status(400).json({ msg: "Invalid email" });
  }
  // Validate newEmail
  if (!newEmail || !isValidEmail(newEmail)) {
      return res.status(400).json({ msg: "Invalid new email" });
  }
  // Update email in the database
  User.findOneAndUpdate({ _id: userId }, { email: newEmail }, { new: true })
      .then((user) => {
          if (user) {
              res.status(200).json(user);
          } else {
              console.log("User not found for update. User ID:", userId);
              return res
                  .status(404)
                  .json({ msg: "User not found for update", userId: userId });
          }
      })
      .catch((error) => {
          console.error("Error updating email:", error);
          return res
              .status(500)
              .json({ msg: "Failed to update email", error: error.message });
      });
};

// Update phone number
exports.updatePhone = (req, res) => {
  const { userId, email, phone } = req.body;
  // Validate email
  if (!email || !isValidEmail(email)) {
      return res.status(400).json({ msg: "Invalid email" });
  }
  console.log("Phone number provided:", phone);
  // Ensure phone is not empty and convert to number
  const phoneNumber = parseInt(phone);
  if (
      !phoneNumber ||
      isNaN(phoneNumber) ||
      phoneNumber.toString().length !== 10
  ) {
      console.log("Invalid phone number:", phoneNumber);
      return res.status(400).json({ msg: "Invalid phone number" });
  }
  console.log("Valid phone number:", phoneNumber);
  // Update phone number in the database
  User.findOneAndUpdate({ _id: userId }, { phone: phoneNumber }, { new: true })
      .then((user) => {
          if (user) {
              console.log("User updated successfully:", user);
              res.status(200).json(user);
          } else {
              console.log("User not found for update. User ID:", userId);
              return res
                  .status(404)
                  .json({ msg: "User not found for update", userId: userId });
          }
      })
      .catch((error) => {
          console.error("Error updating phone:", error);
          return res
              .status(500)
              .json({ msg: "Server Error", error: error.message });
      });
};


// Helper function to validate email format
function isValidEmail(email) {
  //     // Implement your email validation logic here
  //     // For example, you could use a regular expression or a library like validator.js
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

//password update
exports.updatePassword = async (req, res) => {
  const { email, currentPassword, newPassword } = req.body;
  try {
    // Validate email
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ msg: "Invalid email" });
    }
    // Trim whitespace from email and passwords
    const trimmedEmail = email.trim();
    const trimmedCurrentPassword = currentPassword.trim();
    const trimmedNewPassword = newPassword.trim();
    // Validate password length
    if (!trimmedNewPassword || trimmedNewPassword.length < 8) {
      return res
        .status(400)
        .json({ msg: "Password must be at least 8 characters long" });
    }
    // Fetch the user from the database
    const user = await User.findOne({ email: trimmedEmail });
    console.log(user);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    // Check if the current password matches the stored hashed password
    const isMatch = await bcrypt.compare(trimmedCurrentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Current password is incorrect" });
    }
    // Hash the new password
    const hashedPassword = await bcrypt.hash(trimmedNewPassword, 10);
    // Update the password in the database
    user.password = hashedPassword;
    await user.save();
    res.json({ msg: "Password updated successfully" });
  } catch (err) {
    console.error("Error updating password:", err);
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
};


exports.getUser=(req,res)=>{
  User.findOne({_id:req.body.userId}).then((user)=>{
      if (user) {
          res.status(200).json(user);
      }
      else {
          return res.status(400).json({ 'msg': "Internal error" });
      }
  });
}



