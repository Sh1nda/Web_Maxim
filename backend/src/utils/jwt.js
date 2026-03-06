// backend/src/utils/jwt.js
const jwt = require('jsonwebtoken');
const config = require('../config/config');

/**
 * Генерация JWT токена.
 * @param {object} payload
 * @returns {string}
 */
function generateToken(payload) {
  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn
  });
}

/**
 * Проверка и декодирование JWT токена.
 * @param {string} token
 * @returns {object}
 */
function verifyToken(token) {
  return jwt.verify(token, config.jwt.secret);
}

module.exports = {
  generateToken,
  verifyToken
};
