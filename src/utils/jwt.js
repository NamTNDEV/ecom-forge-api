const jwt = require('jsonwebtoken');
const envBaseConfig = require('../configs/env.config');

const createAccessToken = (payload, privateKey) => {
  return jwt.sign(payload, privateKey, {
    algorithm: 'RS256',
    expiresIn: envBaseConfig.jwt.expiresIn.accessToken || '15m',
  });
};

const createRefreshToken = (payload, privateKey) => {
  return jwt.sign(payload, privateKey, {
    algorithm: 'RS256',
    expiresIn: envBaseConfig.jwt.expiresIn.refreshToken || '7d',
  });
};

const createTokenPair = (payload, privateKey) => {
  try {
    const accessToken = createAccessToken(payload, privateKey);
    const refreshToken = createRefreshToken(payload, privateKey);
    return { accessToken, refreshToken };
  } catch (error) {}
};

module.exports = { createTokenPair };
