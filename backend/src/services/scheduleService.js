const Job = require('../models/Job');
const WebSocket = require('ws');

class ScheduleService {
  constructor() {
    this.jobs = [];
    this.currentJob = null;
    this.wss = null;
  }

  setWebSocketServer(wss) {
    this.wss = wss;
  }

  stopCurrentJob() {
    if (this.currentJob) {
      clearTimeout(this.currentJob.startTimer);
      clearTimeout(this.currentJob.completionTimer);
      this.currentJob.status = 'queued';
      this.broadcastJobUpdate(this.currentJob);
      this.jobs.push(this.currentJob); // Add the current job back to the queue
      this.jobs.sort((a, b) => a.duration - b.duration); // Re-sort the queue
      this.currentJob = null;
    }
  }

  async addJob(job) {
    this.jobs.push(job);
    this.jobs.sort((a, b) => a.duration - b.duration); // Sort jobs by duration
    this.broadcastJobUpdate(job);
    
    if (this.currentJob) {
      // If there's a current job, stop it and requeue
      this.stopCurrentJob();
    }
    
    // Always process the next job after adding a new one
    this.processNextJob();
  }

  async processNextJob() {
    if (!this.currentJob && this.jobs.length > 0) {
      this.currentJob = this.jobs.shift();

      // Delay before starting the job
      this.currentJob.startTimer = setTimeout(async () => {
        this.currentJob.status = 'running';
        await this.currentJob.save();
        this.broadcastJobUpdate(this.currentJob);

        this.currentJob.completionTimer = setTimeout(async () => {
          this.currentJob.status = 'completed';
          await this.currentJob.save();
          this.broadcastJobUpdate(this.currentJob);
          this.currentJob = null;
          this.processNextJob();
        }, this.currentJob.duration * 1000);
      }, 5000); // 5-second delay before starting the job
    }
  }

  broadcastJobUpdate(job) {
    if (this.wss) {
      this.wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: 'jobUpdate', data: job }));
        }
      });
    }
  }
}

module.exports = new ScheduleService();