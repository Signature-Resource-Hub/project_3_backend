const express = require('express');
const router = express.Router();
const jobController = require('../controller/job');

router.post('/addJob', jobController.addJob);
router.post('/viewjob', jobController.getJobsByCategory);

module.exports = router;

