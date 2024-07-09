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

  async addJob(job) {
    this.jobs.push(job);
    this.jobs.sort((a, b) => a.duration - b.duration);
    this.processNextJob();
    this.broadcastJobUpdate(job);
  }

  async processNextJob() {
    if (!this.currentJob && this.jobs.length > 0) {
      this.currentJob = this.jobs.shift();
      this.currentJob.status = 'running';
      await this.currentJob.save();
      this.broadcastJobUpdate(this.currentJob);

      setTimeout(async () => {
        this.currentJob.status = 'completed';
        await this.currentJob.save();
        this.broadcastJobUpdate(this.currentJob);
        this.currentJob = null;
        this.processNextJob();
      }, this.currentJob.duration * 1000);
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