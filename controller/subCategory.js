const {validationResult}= require('express-validator')
const SubCategoryModel = require('../models/subCategory');



// Controller function to create a new subcategory
exports.createSubCategory = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        return res.status(400).json({ status: "error", msg: errorMessages.join(" and ") });
      }
  
      const { Category, SubCategory } = req.body;
  
      // Check if the subcategory already exists
      const existingSubCategory = await SubCategoryModel.findOne({ Category: Category, SubCategory: SubCategory });
      if (existingSubCategory) {
        return res.status(400).json({ status: "error", msg: "Subcategory already exists" });
      }
  
      // Create a new subcategory
      const newSubCategory = new SubCategoryModel({ Category: Category, SubCategory: SubCategory });
      await newSubCategory.save();
  
      return res.status(201).json({ status: "success", msg: "Subcategory created successfully", subcategory: newSubCategory });
    } catch (error) {
      console.error(error);
      if (error.code === 11000) { // Duplicate key error
        return res.status(400).json({ status: "error", msg: "Subcategory name must be unique within the Category" });
      }
      return res.status(500).json({ status: "error", msg: "Internal Server Error" });
    }
  };

// Controller function to retrieve all subcategories
exports.getAllSubCategories = async (req, res) => {
  try {
    const subcategories = await SubCategoryModel.find();
    return res.status(200).json({ status: 'success', subcategories });
  } catch (error) {
    console.error('Error retrieving subcategories:', error);
    return res.status(500).json({ status: 'error', msg: 'Internal Server Error' });
  }
};

// Other subcategory-related controller functions...
