const Job = require('../models/Job');
const scheduleService = require('../services/scheduleService');

exports.createJob = async (req, res) => {
  try {
    const { name, duration } = req.body;
    
    // Server-side validation
    if (!name || !duration) {
      return res.status(400).json({ message: "Name and duration are required." });
    }

    const job = new Job({ name, duration });
    await job.save();
    
    // Using await to ensure the job is added to the schedule before responding
    await scheduleService.addJob(job);
    
    res.status(201).json(job);
  } catch (error) {
    console.error("Error creating job: ", error);
    res.status(500).json({ message: "An error occurred while creating the job." });
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });  // Sort by creation time, newest first
    res.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs: ", error);
    res.status(500).json({ message: "An error occurred while fetching jobs." });
  }
};