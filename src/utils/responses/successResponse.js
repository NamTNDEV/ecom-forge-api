const HTTP_STATUS = require('../../constants/httpStatusCodes.constant');
const SUCCESS_MESSAGES = require('../../constants/successMessages/index');

class SuccessResponse {
  constructor({
    message = SUCCESS_MESSAGES.REQUEST_SUCCESSFUL,
    statusCode = HTTP_STATUS.OK,
    metadata = {},
  }) {
    this.message = message;
    this.status = statusCode;
    this.code = `SUCCESS_${statusCode}`;
    this.metadata = metadata;
  }

  send(res, headers = {}) {
    Object.entries(headers).forEach(([key, value]) => {
      res.setHeader(key, value);
    });

    return res.status(this.status).json(this);
  }
}

// --- Common Subclasses ---

class OkSuccess extends SuccessResponse {
  constructor({
    message = SUCCESS_MESSAGES.REQUEST_SUCCESSFUL,
    metadata = {},
  }) {
    super({
      message,
      statusCode: HTTP_STATUS.OK,
      metadata,
    });
  }
}

class CreatedSuccess extends SuccessResponse {
  constructor({
    message = SUCCESS_MESSAGES.OPERATION_SUCCESSFUL,
    metadata = {},
  }) {
    super({
      message,
      statusCode: HTTP_STATUS.CREATED,
      metadata,
    });
  }
}

module.exports = {
  OkSuccess,
  CreatedSuccess,
};
