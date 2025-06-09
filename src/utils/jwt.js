const jwt = require('jsonwebtoken');
const envBaseConfig = require('../configs/env.config');
const { InternalServerError } = require('./responses/appError');
const ERROR_MESSAGES = require('../constants/errorMessages');

const JWT_ALGORITHM = 'HS256';

const createAccessToken = (payload, privateKey) => {
  try {
    return jwt.sign(payload, privateKey, {
      algorithm: JWT_ALGORITHM,
      expiresIn: envBaseConfig.jwt.expiresIn.accessToken || '15m',
    });
  } catch (error) {
    console.error('❌ Failed to create access token::', error);
    throw new InternalServerError(ERROR_MESSAGES.FAILED_TO_CREATE_ACCESS_TOKEN);
  }
};

const createRefreshToken = (payload, privateKey) => {
  try {
    return jwt.sign(payload, privateKey, {
      algorithm: JWT_ALGORITHM,
      expiresIn: envBaseConfig.jwt.expiresIn.refreshToken || '7d',
    });
  } catch (error) {
    console.error('❌ Failed to create refresh token::', error);
    throw new InternalServerError(
      ERROR_MESSAGES.FAILED_TO_CREATE_REFRESH_TOKEN
    );
  }
};

const createTokenPair = (payload, accessSecret, refreshSecret) => {
  try {
    const accessToken = createAccessToken(payload, accessSecret);
    const refreshToken = createRefreshToken(payload, refreshSecret);
    return { accessToken, refreshToken };
  } catch (error) {
    console.error('❌ Failed to create token pair::', error);
    throw new InternalServerError(ERROR_MESSAGES.FAILED_TO_CREATE_TOKEN_PAIR);
  }
};

const verifyToken = (token, secret) => {
  try {
    return jwt.verify(token, secret, { algorithms: [JWT_ALGORITHM] });
  } catch (err) {
    console.error('❌ Failed to verify token::', err);
    throw new UnauthorizedError(ERROR_MESSAGES.INVALID_OR_EXPIRED_TOKEN);
  }
};

module.exports = {
  createTokenPair,
  verifyToken,
};
