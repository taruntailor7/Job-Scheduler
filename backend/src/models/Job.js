const mongoose = require('mongoose');

// Define the job schema
const jobSchema = new mongoose.Schema({
  name: { type: String, required: true },
  duration: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'running', 'completed'], default: 'pending' }
}, { timestamps: true }); // Add timestamps for createdAt and updatedAt

// Export the Job model
module.exports = mongoose.model('Job', jobSchema);