const express = require('express');
const router = express.Router();
const subcategoryController = require('../controller/subCategory');

// Route to handle POST requests for creating subcategories
router.post('/subcategories', subcategoryController.createSubCategory);
router.get('/subcategories', subcategoryController.getAllSubCategories);
// Other subcategory routes...
// Route to retrieve subcategories under a specific category
// Route to retrieve subcategories under a specific category from request body
// Route to retrieve subcategories by category ID from request body
router.post('/subcategories/byCategoryId', subcategoryController.getSubcategoriesByCategoryIdFromBody);

module.exports = router;
