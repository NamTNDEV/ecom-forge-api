const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const app = express();

// Init Middleware
// o0o --- Morgan: is a logging middleware for Node.js HTTP servers --- o0o
app.use(morgan('dev')); // For development mode, logs requests in a concise format
// app.use(morgan('combined')); // For production mode, logs requests in a standard Apache combined format

// o0o --- Helmet: is a middleware that helps secure Express apps by setting various HTTP headers --- o0o
app.use(helmet());

// o0o --- Compression: is a middleware that compresses response bodies for all requests that traverse through the middleware --- o0o
app.use(compression()); // Parses incoming requests with JSON payloads

// Init Database

// Init Routes
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the API!',
  });
});

// Error Handling Middleware

module.exports = app;
