const keyTokenModel = require('../models/keyToken.model');

class keyTokenService {
  static createKeyToken = async ({ userId, publicKey }) => {
    try {
      const publicKeyString = publicKey.toString();
      const keyToken = await keyTokenModel.create({
        user: userId,
        publicKey: publicKeyString,
      });
      return keyToken ? publicKeyString : null;
    } catch (error) {
      return error;
    }
  };
}

module.exports = keyTokenService;
