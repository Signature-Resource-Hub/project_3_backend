// const express = require('express');
// const router = express.Router();
// const contactController = require('../controller/contact');

// router.post('/registercontact', contactController.registerContact);



// module.exports = router;


const express = require('express');
const router = express.Router();
const contactController = require('../controller/contact');

// Ensure route matches /api/registercontact exactly
router.post('/registercontact', contactController.registerContact);

module.exports = router;
