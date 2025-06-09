const keyTokenModel = require('../models/keyToken.model');
const { InternalServerError } = require('../utils/responses/appError');
const ERROR_MESSAGES = require('../constants/errorMessages');

class KeyTokenService {
  static storeKeyToken = async ({
    userId,
    refreshToken,
    accessSecretKey,
    refreshSecretKey,
  }) => {
    try {
      const accessSecretKeyString = accessSecretKey.toString();
      const refreshSecretKeyString = refreshSecretKey.toString();
      // const keyToken = await keyTokenModel.create({
      //   user: userId,
      //   accessTokenSecret: accessSecretKeyString,
      //   refreshTokenSecret: refreshSecretKeyString,
      // });

      const filter = { user: userId };
      const update = {
        refreshToken,
        usedRefreshTokens: [],
        accessTokenSecret: accessSecretKeyString,
        refreshTokenSecret: refreshSecretKeyString,
      };
      const options = { upsert: true, new: true, setDefaultsOnInsert: true };
      const keyToken = await keyTokenModel
        .findOneAndUpdate(filter, update, options)
        .lean();
      if (!keyToken) {
        throw new InternalServerError(ERROR_MESSAGES.FAILED_TO_STORE_KEY_TOKEN);
      }
      return keyToken;
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  };
}

module.exports = KeyTokenService;
