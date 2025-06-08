const keyTokenModel = require('../models/keyToken.model');
const { InternalServerError } = require('../utils/appError');

class KeyTokenService {
  static createKeyToken = async ({
    userId,
    accessSecretKey,
    refreshSecretKey,
  }) => {
    try {
      const accessSecretKeyString = accessSecretKey.toString();
      const refreshSecretKeyString = refreshSecretKey.toString();
      const keyToken = await keyTokenModel.create({
        user: userId,
        accessTokenSecret: accessSecretKeyString,
        refreshTokenSecret: refreshSecretKeyString,
      });
      if (!keyToken) {
        throw new InternalServerError('Failed to store key token.');
      }
      return keyToken;
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  };
}

module.exports = KeyTokenService;
