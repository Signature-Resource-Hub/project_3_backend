const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'person', // Assuming your user model is named 'Person'
    required: true
  },
  title: {
    type: String,
    required: true,
    maxlength: 52,
  },
  picture: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: false,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String
  },
  Category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category',
    required: true
  },
  SubCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'subCategory',
    required: true
  }
});

const ServiceModel = mongoose.model("Service", ServiceSchema);

module.exports = ServiceModel;
