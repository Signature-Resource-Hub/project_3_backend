
const express = require('express');
const router = express.Router();
const propertiesController = require('../controller/properties');

router.post('/register-properties', propertiesController.registerProperties);
router.post('/delete-property',propertiesController.deleteProperty);
router.post('/update-property',propertiesController.updateProperty);
router.get('/view-property',propertiesController.getPropertiesByType);
router.get('/get-property',propertiesController.getPropertyById);
router.get('/viewall',propertiesController.getAllProperties);
router.get('/rent',propertiesController.getRentProperties);
router.get('/sale',propertiesController.getSaleProperties);


module.exports = router;
