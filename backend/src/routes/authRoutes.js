// backend/src/routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

/**
 * POST /api/auth/register
 * Регистрация нового пользователя.
 */
router.post('/register', authController.register);

/**
 * POST /api/auth/login
 * Авторизация пользователя.
 */
router.post('/login', authController.login);

module.exports = router;
