const { API_KEY_HEADER } = require('../constants/header.constant');
const { ERROR_MESSAGES } = require('../constants/message.constant');
const ApiKeyService = require('../services/apiKey.service');
const { ForbiddenError } = require('../utils/appError');

const verifyApiKey = async (req, res, next) => {
  const apiKey = req.headers[API_KEY_HEADER]?.toString().trim();

  if (!apiKey) {
    throw new ForbiddenError(ERROR_MESSAGES.MISSING_API_KEY);
  }

  const keyRecord = await ApiKeyService.findByKey({
    key: apiKey,
    status: true,
  });
  if (!keyRecord) {
    throw new ForbiddenError(ERROR_MESSAGES.INVALID_API_KEY);
  }

  req.apiKeyInfo = keyRecord;
  return next();
};

module.exports = verifyApiKey;
