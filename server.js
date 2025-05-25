require('dotenv').config(); // Load environment variables from .env file
const envBaseConfig = require('./src/configs/env.config'); // Load environment configuration
const app = require('./src/app');
const _PORT = envBaseConfig.app.port; // Default port is 3000 if not specified in .env
const server = app.listen(_PORT, () => {
  console.log(`Server is running on port ${_PORT}`);
});

process.on('SIGINT', () => {
  server.close(() => {
    console.log('📍Server closed!!');
    process.exit(0);
  });
});
