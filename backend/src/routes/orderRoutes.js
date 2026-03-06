// backend/src/routes/orderRoutes.js
const express = require('express');
const orderController = require('../controllers/orderController');
const { authMiddleware, adminOnly } = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * POST /api/orders
 * Создание заказа текущего пользователя.
 */
router.post('/', authMiddleware, orderController.createOrder);

/**
 * GET /api/orders/my
 * Заказы текущего пользователя.
 */
router.get('/my', authMiddleware, orderController.listMyOrders);

/**
 * GET /api/orders
 * Все заказы (админ).
 */
router.get('/', authMiddleware, adminOnly, orderController.listAllOrders);

/**
 * PATCH /api/orders/:id/status
 * Обновление статуса заказа (админ).
 */
router.patch(
  '/:id/status',
  authMiddleware,
  adminOnly,
  orderController.updateOrderStatus
);

module.exports = router;
