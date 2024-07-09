const Job = require('../models/Job');
const WebSocket = require('ws');

class ScheduleService {
  constructor() {
    this.jobs = [];
    this.currentJob = null;
    this.wss = null;
    this.isProcessing = false;
  }

  setWebSocketServer(wss) {
    this.wss = wss;
  }

  stopCurrentJob() {
    if (this.currentJob) {
      clearTimeout(this.currentJob.startTimer);
      clearTimeout(this.currentJob.completionTimer);
      this.currentJob.status = 'queued';
      this.jobs.unshift(this.currentJob);
      this.broadcastJobUpdate(this.currentJob);
      this.currentJob = null;
    }
  }

  async addJob(job) {
    await job.save();  // Save the job to the database first
    this.jobs.push(job);
    this.jobs.sort((a, b) => a.duration - b.duration);
    this.broadcastJobUpdate(job);
    
    if (this.currentJob && job.duration < this.currentJob.duration) {
      this.stopCurrentJob();
    }
    
    if (!this.isProcessing) {
      this.startProcessing();
    }
  }

  async startProcessing() {
    this.isProcessing = true;
    await this.processNextJob();
  }

  async processNextJob() {
    if (this.jobs.length > 0) {
      this.currentJob = this.jobs.shift();
      this.currentJob.status = 'queued';
      await this.currentJob.save();
      this.broadcastJobUpdate(this.currentJob);
      
      // Introduce a delay before starting the job
      this.currentJob.startTimer = setTimeout(async () => {
        this.currentJob.status = 'running';
        this.currentJob.startTime = new Date();
        await this.currentJob.save();
        this.broadcastJobUpdate(this.currentJob);

        this.currentJob.completionTimer = setTimeout(async () => {
          this.currentJob.status = 'completed';
          this.currentJob.completionTime = new Date();
          await this.currentJob.save();
          this.broadcastJobUpdate(this.currentJob);
          this.currentJob = null;
          await this.processNextJob();
        }, this.currentJob.duration * 1000);
      }, 5000); // 5-second delay before starting the job
    } else {
      this.isProcessing = false;
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