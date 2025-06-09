const HEADER_CONSTANTS = require('../constants/header.constant');
const ERROR_MESSAGES = require('../constants/errorMessages');
const { UnauthorizedError } = require('../utils/responses/appError');
const KeyTokenService = require('../services/keyToken.service');
const { verifyToken } = require('../utils/jwt');

const authenticate = async (req, res, next) => {
  const clientId = req.headers[HEADER_CONSTANTS.CLIENT_ID];
  const accessToken = req.headers.authorization;
  if (!clientId || !accessToken || !accessToken.startsWith('Bearer ')) {
    if (!clientId || !accessToken) {
      console.error(
        `❌ Authentication failed:: Missing ${
          !clientId ? '"ClientId"' : '"AccessToken"'
        } in request headers`
      );
    } else {
      console.error(
        `❌ Authentication failed:: Invalid access token format in request headers`
      );
    }
    throw new UnauthorizedError();
  }
  const token = accessToken.split(' ')[1];
  const keyToken = await KeyTokenService.getKeyTokenByUserId(clientId);
  if (!keyToken) {
    console.error(
      `❌ Authentication failed:: No key token found for ClientId: ${clientId}`
    );
    throw new UnauthorizedError();
  }
  const decodedAccessToken = verifyToken(token, keyToken.accessTokenSecret);
  if (decodedAccessToken.userId !== clientId) {
    console.error(
      `❌ Authentication failed:: UserId mismatch in access token for ClientId: ${clientId}`
    );
    throw new UnauthorizedError();
  }

  req.keysInfo = keyToken;
  return next();
};

module.exports = authenticate;
