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
      this.jobs.unshift(this.currentJob); // Requeue the current job
      this.broadcastJobUpdate(this.currentJob);
      this.currentJob = null;
    }
  }

  async addJob(job) {
    this.jobs.push(job);
    this.jobs.sort((a, b) => a.duration - b.duration); // Sort jobs by duration
    this.broadcastJobUpdate(job);
    
    if (this.currentJob && job.duration < this.currentJob.duration) {
      this.stopCurrentJob();
    }
    
    if (!this.currentJob) {
      this.processNextJob();
    }
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