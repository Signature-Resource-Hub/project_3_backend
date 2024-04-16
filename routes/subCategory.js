const express = require('express');
const router = express.Router();
const subcategoryController = require('../controller/subCategory');

// Route to handle POST requests for creating subcategories
router.post('/subcategories', subcategoryController.createSubCategory);

// Other subcategory routes...

module.exports = router;
