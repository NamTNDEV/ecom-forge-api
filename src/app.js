const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const { checkOverloaded } = require('./helpers/connectChecker.helper'); // Import connectChecker if needed
const router = require('./routes'); // Import your routes

const app = express();

// Init Middleware
// o0o --- Morgan: is a logging middleware for Node.js HTTP servers --- o0o
app.use(morgan('dev')); // For development mode, logs requests in a concise format
// app.use(morgan('combined')); // For production mode, logs requests in a standard Apache combined format

// o0o --- Helmet: is a middleware that helps secure Express apps by setting various HTTP headers --- o0o
app.use(helmet());

// o0o --- Compression: is a middleware that compresses response bodies for all requests that traverse through the middleware --- o0o
app.use(compression()); // Parses incoming requests with JSON payloads

app.use(express.json()); // Parses incoming requests with URL-encoded payloads
app.use(express.urlencoded({ extended: true })); // Parses incoming requests with multipart/form-data payloads

// Init Database
const db = require('./configs/db.config'); // Ensure this file initializes the database connection
const { errorHandler } = require('./middlewares/handleError');
checkOverloaded(); // Start checking for overloaded connections

// Init Routes
app.use('', router);

// Error Handling Middleware
app.use(errorHandler);

module.exports = app;
