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

module.exports = asyncErrorHandler;
