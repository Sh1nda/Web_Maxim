// backend/src/middlewares/authMiddleware.js
const { verifyToken } = require('../utils/jwt');

/**
 * Middleware для проверки JWT токена.
 */
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res
      .status(401)
      .json({ success: false, message: 'Требуется авторизация' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (e) {
    return res
      .status(401)
      .json({ success: false, message: 'Неверный или истёкший токен' });
  }
}

/**
 * Middleware для проверки роли администратора.
 */
function adminOnly(req, res, next) {
  if (!req.user || req.user.role !== 'ADMIN') {
    return res
      .status(403)
      .json({ success: false, message: 'Доступ запрещён' });
  }
  next();
}

module.exports = {
  authMiddleware,
  adminOnly
};
