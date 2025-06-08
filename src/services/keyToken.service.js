const keyTokenModel = require('../models/keyToken.model');

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
      console.log('Key token created successfully:', keyToken);
    } catch (error) {
      console.log('Error creating key token:', error);
      return error;
    }
  };
}

module.exports = KeyTokenService;
