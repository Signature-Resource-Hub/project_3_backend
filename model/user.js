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
    required: true,
  },
  user_type: {
    type: String,
    default: "user",
  },
  status: {
    type: String,
    enum: ['pending', 'verified'],
    default: 'pending'
  }
});

const PersonModel = mongoose.model("Person", PersonSchema);
module.exports = PersonModel;
