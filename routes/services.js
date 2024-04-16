const express = require('express');
const router = express.Router();
const { body } = require('express-validator'); // Importing body from express-validator for request body validation
const serviceController = require('../controller/services');

// Route to register a new service
router.post('/services', [
  // Validation middleware for request body fields
  body('title').notEmpty().withMessage('Title is required'),
  body('picture').notEmpty().withMessage('Picture URL is required'),
  body('description').notEmpty().withMessage('Description is required'),
], serviceController.registerService);

// Route to update a service (using POST)
router.post('/services/update', serviceController.updateService);

// Route to delete a service (using POST)
router.post('/services/delete', serviceController.deleteService);
// Route to get services by category ID
router.post('/services/category', [
  // Validation middleware for request body fields
  body('categoryId').notEmpty().withMessage('Category ID is required'),
], serviceController.getServicesByCategoryId);


// Route to get services by service IDs
router.post('/services/ids', [
  // Validation middleware for request body fields
  body('serviceIds').isArray({ min: 1 }).withMessage('Service IDs must be an array with at least one ID'),
], serviceController.getServicesByServiceIds);

module.exports = router;
