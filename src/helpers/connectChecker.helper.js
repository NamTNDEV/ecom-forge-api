const mongoose = require('mongoose');
const os = require('os');

const _SECONDS = 5000; // 5 second in milliseconds

const countConnectedClients = () => {
  const numberOfClients = mongoose.connections.length;
  console.log(`🟢 Number of connected clients:: ${numberOfClients}`);
};

const checkOverloaded = () => {
  setInterval(() => {
    const numberOfClients = mongoose.connections.length;
    const numCores = os.cpus().length;
    const memoryUsage = process.memoryUsage().rss / (1024 * 1024); // Convert to MB

    const maxConnections = numCores * 5; // Example threshold: 5 connections per core

    console.log(`Current number of connected clients:: ${numberOfClients}`);
    console.log(`Current memory usage:: ${memoryUsage.toFixed(2)} MB`);

    if (numberOfClients > maxConnections) {
      console.warn(
        `⚠️ Warning: High number of connected clients detected: ${numberOfClients}. Consider optimizing your application.`
      );
    }
  }, _SECONDS);
};

module.exports = {
  checkOverloaded,
  countConnectedClients,
};
