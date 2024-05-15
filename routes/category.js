const express = require('express');
const router = express.Router();
const categoryController = require('../controller/category');

// Route to handle POST requests for creating categories
router.post('/categories', categoryController.createCategory);
router.get('/categories', categoryController.getAllCategories);

// Other category routes...

module.exports = router;
