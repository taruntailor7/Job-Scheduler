const express = require('express');
const jobController = require('../controllers/jobController');

const router = express.Router();

// Route to create a new job
router.post('/', jobController.createJob);

// Route to get all jobs
router.get('/', jobController.getAllJobs);

module.exports = router;