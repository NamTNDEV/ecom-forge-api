const _ENV = (process.env.NODE_ENV || 'dev').toUpperCase();
const envBaseConfig = {
  app: {
    port: process.env[`${_ENV}_PORT`] || 3000,
    host: process.env[`${_ENV}_HOST`] || 'localhost',
    name: process.env[`${_ENV}_APP_NAME`] || 'EcomForge',
  },
  db: {
    uri:
      process.env[`${_ENV}_DB_URI`] || 'mongodb://localhost:27017/ecom-forge',
  },
  jwt: {
    expiresIn: {
      accessToken: process.env[`${_ENV}_JWT_ACCESS_TOKEN_EXPIRES_IN`] || '15m',
      refreshToken: process.env[`${_ENV}_JWT_REFRESH_TOKEN_EXPIRES_IN`] || '7d',
    },
  },
};

module.exports = envBaseConfig;
