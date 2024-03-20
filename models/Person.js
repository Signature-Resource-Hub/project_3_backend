const mongoose = require("mongoose");
const PersonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 52,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: String,
  },
  user_type: {
    type: String,
    default: "user",
  },
});
const PersonModel = mongoose.model("person", PersonSchema);
module.exports = PersonModel;
