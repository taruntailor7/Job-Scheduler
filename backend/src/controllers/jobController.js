const Job = require('../models/Job');
const scheduleService = require('../services/scheduleService');

// Controller to create a new job
exports.createJob = async (req, res) => {
  try {
    const { name, duration } = req.body;
    const job = new Job({ name, duration });
    await job.save();
    await scheduleService.addJob(job); // Add job to the schedule service
    res.status(201).json(job);
  } catch (error) {
    console.log("Error creating job: ", error);
    res.status(400).json({ message: error.message });
  }
};

// Controller to get all jobs
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};