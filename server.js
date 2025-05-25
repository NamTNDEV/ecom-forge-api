const app = require('./src/app');
const _PORT = 3000;
const server = app.listen(_PORT, () => {
  console.log(`Server is running on port ${_PORT}`);
});

process.on('SIGINT', () => {
  server.close(() => {
    console.log('📍Server closed!!');
    process.exit(0);
  });
});
