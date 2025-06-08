const apiKeyModel = require('../models/apiKey.model');
const crypto = require('crypto');

class ApiKeyService {
  static async findByKey({ key, status = true }) {
    return await apiKeyModel.findOne({ key, status }).lean();
  }

  static async createApiKey({ description, permissions = [] }) {
    const key = crypto.randomBytes(64).toString('hex'); // Generate a random API key
    const newApiKey = await apiKeyModel.create({
      key,
      description,
      permissions,
    });
    return newApiKey;
  }
}

module.exports = ApiKeyService;
