import React from 'react';
import './JobList.css';

const JobList = ({ jobs }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#ffc107'; // yellow
      case 'running': return '#17a2b8'; // blue
      case 'completed': return '#28a745'; // green
      default: return '#6c757d'; // grey
    }
  };

  return (
    <div className="job-list-container">
      <h2>Job Queue</h2>
      {jobs.length === 0 ? (
        <p className="no-jobs">No jobs in the queue.</p>
      ) : (
        <ul className="job-list">
          {[...jobs].reverse().map((job) => (
            <li key={job._id} className="job-item">
              <div className="job-info">
                <h3 className="job-name">Title: {job.name}</h3>
                <p className="job-duration">Duration: {job.duration}s</p>
              </div>
              <div 
                className="job-status"
                style={{ backgroundColor: getStatusColor(job.status) }}
              >
                {job.status}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JobList;