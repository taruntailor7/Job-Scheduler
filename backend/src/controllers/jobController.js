const Job = require('../models/Job');
const scheduleService = require('../services/scheduleService');

exports.createJob = async (req, res) => {
  try {
    const { name, duration } = req.body;
    const job = new Job({ name, duration });
    await job.save();
    scheduleService.addJob(job);
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};