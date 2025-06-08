const HTTP_STATUS = require('../../constants/httpStatusCodes.constant');
const ERROR_MESSAGES = require('../../constants/errorMessages');

class ErrorResponse extends Error {
  constructor({
    message = ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR,
    errors = null,
  }) {
    super(message);
    this.status = statusCode;
    this.code = `ERROR_${statusCode}`;
    this.message = message;
    if (errors) this.errors = errors;

    Error.captureStackTrace(this, this.constructor);
  }
}

class BadRequestError extends ErrorResponse {
  constructor(
    message = ERROR_MESSAGES.BAD_REQUEST,
    statusCode = HTTP_STATUS.BAD_REQUEST,
    errors = null
  ) {
    super({ message, statusCode, errors });
  }
}

class UnauthorizedError extends ErrorResponse {
  constructor(
    message = ERROR_MESSAGES.UNAUTHORIZED,
    statusCode = HTTP_STATUS.UNAUTHORIZED
  ) {
    super({ message, statusCode });
  }
}

class ForbiddenError extends ErrorResponse {
  constructor(
    message = ERROR_MESSAGES.FORBIDDEN,
    statusCode = HTTP_STATUS.FORBIDDEN
  ) {
    super({ message, statusCode });
  }
}

class NotFoundError extends ErrorResponse {
  constructor(
    message = ERROR_MESSAGES.NOT_FOUND,
    statusCode = HTTP_STATUS.NOT_FOUND
  ) {
    super({ message, statusCode });
  }
}

class ConflictError extends ErrorResponse {
  constructor(
    message = ERROR_MESSAGES.CONFLICT,
    statusCode = HTTP_STATUS.CONFLICT
  ) {
    super({ message, statusCode });
  }
}

class ValidationError extends ErrorResponse {
  constructor(
    message = ERROR_MESSAGES.UNPROCESSABLE_ENTITY,
    statusCode = HTTP_STATUS.UNPROCESSABLE_ENTITY,
    errors = []
  ) {
    super({ message, statusCode, errors });
  }
}

class InternalServerError extends ErrorResponse {
  constructor(
    message = ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR
  ) {
    super({ message, statusCode });
  }
}

module.exports = {
  InternalServerError,
  ErrorResponse,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  ValidationError,
};
