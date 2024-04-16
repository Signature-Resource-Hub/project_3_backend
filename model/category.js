const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  Category: {
    type: String,
    required: true,
    maxlength: 52,
    unique: true // Ensure uniqueness of category names
  }
});

const CategoryModel = mongoose.model("category", CategorySchema);

module.exports = CategoryModel;
