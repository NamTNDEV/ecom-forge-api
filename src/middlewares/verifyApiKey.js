const { API_KEY_HEADER } = require('../constants/header.constant');
const ApiKeyService = require('../services/apiKey.service');

const _MESSAGES = {
  INVALID_API_KEY: 'Forbidden: Invalid API Key',
  MISSING_API_KEY: 'Forbidden: API Key is required',
  INTERNAL_SERVER_ERROR: 'Internal server error',
};

const verifyApiKey = async (req, res, next) => {
  try {
    const apiKey = req.headers[API_KEY_HEADER]?.toString().trim();

    if (!apiKey) {
      return res.status(403).json({
        message: _MESSAGES.MISSING_API_KEY,
      });
    }

    const keyRecord = await ApiKeyService.findByKey({
      key: apiKey,
      status: true,
    });
    if (!keyRecord) {
      return res.status(403).json({
        message: _MESSAGES.INVALID_API_KEY,
      });
    }

    req.apiKeyInfo = keyRecord;
    return next();
  } catch (error) {
    return res.status(500).json({
      message: _MESSAGES.INTERNAL_SERVER_ERROR,
    });
  }
};

module.exports = verifyApiKey;
