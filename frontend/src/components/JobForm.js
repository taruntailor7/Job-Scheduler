import React, { useState } from 'react';
import axios from 'axios';
import './JobForm.css';

const JobForm = ({ updateJobs }) => {
  const [job, setJob] = useState({ name: '', duration: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Validate the form inputs
  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    if (!job.name.trim()) {
      formIsValid = false;
      errors.name = "Job name is required";
    }
    if (!job.duration) {
      formIsValid = false;
      errors.duration = "Duration is required";
    } else if (isNaN(job.duration) || job.duration <= 0) {
      formIsValid = false;
      errors.duration = "Duration must be a positive number";
    }

    setErrors(errors);
    return formIsValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('https://job-scheduler-ykb2.onrender.com/api/jobs', job);
        updateJobs(response.data);
        setJob({ name: '', duration: '' });
        setErrors({});
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000); // Success message disappears after 5 seconds
      } catch (error) {
        console.error('Error submitting job:', error);
        setErrors({ submit: "Error submitting job. Please try again." });
      }
    }
  };

  return (
    <div className="job-form-container">
      <h2>Add New Job</h2>
      <form onSubmit={handleSubmit} className="job-form">
        <div className="form-group">
          <label htmlFor="job-name">Job Name</label>
          <input
            id="job-name"
            type="text"
            placeholder="Enter job name"
            value={job.name}
            onChange={(e) => setJob({ ...job, name: e.target.value })}
            required
          />
          {errors.name && <div className="error">{errors.name}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="job-duration">Duration (seconds)</label>
          <input
            id="job-duration"
            type="number"
            placeholder="Enter duration"
            value={job.duration}
            onChange={(e) => setJob({ ...job, duration: e.target.value })}
            required
          />
          {errors.duration && <div className="error">{errors.duration}</div>}
        </div>
        <button type="submit" className="submit-btn">Add Job</button>
        {errors.submit && <div className="error submit-error">{errors.submit}</div>}
      </form>
      {submitted && (
        <div className="success-message">
          Job submitted successfully! It will start processing in about 5 seconds.
        </div>
      )}
    </div>
  );
};

export default JobForm;