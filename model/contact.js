const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ContactSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  issue: {
    type: String,
    required: true
  },
  topic: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

module.exports = Contact = mongoose.model('contact', ContactSchema);

