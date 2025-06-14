const ERROR_MESSAGES = require('../constants/errorMessages');

const errorHandler = (err, req, res, next) => {
  const status = err.status || err.statusCode;
  const response = {
    status,
    code: err.code || `ERROR_${status}`,
    message: err.message || ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    ...(err.errors && { errors: err.errors }),
  };
  console.log(`❌ Error response:: ${JSON.stringify(response)}`);
  return res.status(status).json(response);
};

module.exports = errorHandler;
