const { ERROR_MESSAGES } = require('../constants/message.constant');

const errorHandler = (err, req, res, next) => {
  const errorStatus = err.code || err.statusCode || 500;
  const response = {
    status: err.status || `ERROR_${errorStatus}`,
    code: errorStatus,
    message: err.message || ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    ...(err.errors && { errors: err.errors }),
  };
  return res.status(errorStatus).json(response);
};

const asyncErrorHandler = fn => {
  return async (req, res, next) => {
    // Promise.resolve(fn(req, res, next)).catch(next);
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  errorHandler,
  asyncErrorHandler,
};
