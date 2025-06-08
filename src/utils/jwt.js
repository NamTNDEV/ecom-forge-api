const jwt = require('jsonwebtoken');
const envBaseConfig = require('../configs/env.config');

const createAccessToken = (payload, privateKey) => {
  return jwt.sign(payload, privateKey, {
    algorithm: 'HS256',
    expiresIn: envBaseConfig.jwt.expiresIn.accessToken || '15m',
  });
};

const createRefreshToken = (payload, privateKey) => {
  return jwt.sign(payload, privateKey, {
    algorithm: 'HS256',
    expiresIn: envBaseConfig.jwt.expiresIn.refreshToken || '7d',
  });
};

const createTokenPair = (payload, accessSecret, refreshSecret) => {
  try {
    const accessToken = createAccessToken(payload, accessSecret);
    const refreshToken = createRefreshToken(payload, refreshSecret);
    return { accessToken, refreshToken };
  } catch (error) {
    console.error('Error creating token pair:', error);
    return {
      code: 'TOKEN_CREATION_ERROR',
      message: 'Failed to create token pair',
    };
  }
};

module.exports = { createTokenPair };
