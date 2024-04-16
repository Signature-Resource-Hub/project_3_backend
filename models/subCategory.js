const mongoose = require("mongoose");

const SubCategorySchema = new mongoose.Schema({
  Category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category',
    required: true
  },
  SubCategory: {
    type: String,
    required: true,
    maxlength: 52,
  }
});

// Define a compound index to enforce uniqueness of Category and SubCategory combination
SubCategorySchema.index({ Category: 1, SubCategory: 1 }, { unique: true });

const SubCategoryModel = mongoose.model("SubCategory", SubCategorySchema);

module.exports = SubCategoryModel;
