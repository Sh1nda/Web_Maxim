// backend/src/routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
const { authMiddleware, adminOnly } = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * GET /api/users/me
 * Профиль текущего пользователя.
 */
router.get('/me', authMiddleware, userController.me);

/**
 * GET /api/users
 * Список пользователей (только админ).
 */
router.get('/', authMiddleware, adminOnly, userController.listUsers);

module.exports = router;
