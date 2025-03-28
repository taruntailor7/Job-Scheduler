import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import JobForm from './components/JobForm';
import JobList from './components/JobList';
import './App.css';

function App() {
  const [jobs, setJobs] = useState([]);

  const updateJobs = useCallback((newJob) => {
    setJobs(prevJobs => {
      const jobIndex = prevJobs.findIndex(job => job._id === newJob._id);
      if (jobIndex !== -1) {
        // Update existing job
        return prevJobs.map(job => job._id === newJob._id ? newJob : job);
      } else {
        // Add new job
        return [...prevJobs, newJob];
      }
    });
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('https://job-scheduler-ykb2.onrender.com/api/jobs');
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    fetchJobs();

    // Initialize WebSocket connection
    const ws = new WebSocket('wss://job-scheduler-ykb2.onrender.com');
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'jobUpdate') {
        updateJobs(message.data);
      }
    };

    return () => {
      ws.close(); // Clean up WebSocket connection on component unmount
    };
  }, [updateJobs]);

  return (
    <div className="App">
      <h1>Job Scheduler</h1>
      <JobForm updateJobs={updateJobs} />
      <h2>Jobs</h2>
      <JobList jobs={jobs} />
    </div>
  );
}

export default App;