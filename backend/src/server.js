require('dotenv').config();
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const connectDB = require('./config/database');
const jobRoutes = require('./routes/jobRoutes');
const scheduleService = require('./services/scheduleService');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

connectDB();

app.use(express.json());

app.get('/', function(req, res) {
  console.log('Welcome to Job Scheduler by Apica!');
  res.send('Welcome to Job Scheduler by Apica!');
});
app.use('/api/jobs', jobRoutes);

scheduleService.setWebSocketServer(wss);

wss.on('connection', (ws) => {
  console.log('Client connected');
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));