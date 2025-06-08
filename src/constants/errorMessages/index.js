// src/constants/errorMessages/index.js
const AUTH_ERRORS = require('./auth.error');
const API_KEY_ERRORS = require('./apiKey.error');
const COMMON_ERRORS = require('./common.error');

module.exports = {
  ...AUTH_ERRORS,
  ...API_KEY_ERRORS,
  ...COMMON_ERRORS,
};
