// backend/src/config/config.js
require('dotenv').config();

const config = {
  port: process.env.PORT || 4000,
  env: process.env.NODE_ENV || 'development',
  jwt: {
    secret: process.env.JWT_SECRET || 'dev_secret',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  }
};

module.exports = config;
