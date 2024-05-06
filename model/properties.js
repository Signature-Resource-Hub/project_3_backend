// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const PropertiesSchema = new Schema({
//   user_id: {
//     type: Schema.Types.ObjectId,
//     ref: 'person',
//     required: true
//   },
//   price: {
//     type: String,
//     required: true,
//     maxlength: 52,
//   },
//   description: {
//     type: String,
//     trim: true,
//     required: true,
//     maxlength: 200
//   },
//   phone: {
//     type: String,
//     required: true,
//     // Remove unique constraint to allow duplicate phone numbers
//   },
//   whatsapp: {
//     type: String,
//     trim: true,
//     required: true,
//   },
//   email: {
//     type: String,
//     trim: true,
//     required: true,
//     // Remove unique constraint to allow duplicate emails
//   },
//   location: {
//     type: String,
//     required: true,
//   },
//   property_type: {
//     type: String,
//     required: true
//   }
// });

// const PropertiesModel = mongoose.model("properties", PropertiesSchema);
// module.exports = PropertiesModel;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PropertySchema = new Schema({
  user_id: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  bhk: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  whatsapp: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  property_type: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
   
  }
});

module.exports = Property = mongoose.model('property', PropertySchema);

