const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  name: { type: String, required: true },
  duration: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'running', 'completed'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);