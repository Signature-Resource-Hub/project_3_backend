const { validationResult } = require('express-validator');
const CategoryModel = require('../models/category');

// Controller function to create a new category
exports.createCategory = async (req, res) => {
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: "error", errors: errors.array() });
    }

    // Extract category from request body
    const { Category } = req.body;

    // Check if the Category already exists
    const existingCategory = await CategoryModel.findOne({ Category: Category });
    console.log(existingCategory);
    if (existingCategory) {
      return res.status(400).json({ status: "error", msg: "Category already exists" });
    }

    // Create a new category
    const newCategory = new CategoryModel(req.body);
    await newCategory.save();

    return res.status(201).json({ status: "success", msg: "Category created successfully", Category: newCategory });
  } catch (error) {
    console.error(error);
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({ status: "error", msg: "Category name must be unique" });
    }
    // Handle other errors
    return res.status(500).json({ status: "error", msg: "Internal Server Error" });
  }
};
