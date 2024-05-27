const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'person', // Assuming your user model is named 'Person'
    // required: true
  },
  title: {
    type: String,
    required: true,
    maxlength: 52,
  },
  picture: {
    data: Buffer, // Use Buffer type to store binary data
    contentType: String, // Use String type to store content type (e.g., 'image/png', 'image/jpeg')
    
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
    required: false
  }
});

const ServiceModel = mongoose.model("Service", ServiceSchema);

module.exports = ServiceModel;
