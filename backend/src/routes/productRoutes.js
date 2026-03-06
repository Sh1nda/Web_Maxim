// backend/src/routes/productRoutes.js
const express = require('express');
const productController = require('../controllers/productController');
const { authMiddleware, adminOnly } = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * GET /api/products
 */
router.get('/', productController.listProducts);

/**
 * GET /api/products/:id
 */
router.get('/:id', productController.getProduct);

/**
 * POST /api/products (admin)
 */
router.post('/', authMiddleware, adminOnly, productController.createProduct);

/**
 * PUT /api/products/:id (admin)
 */
router.put('/:id', authMiddleware, adminOnly, productController.updateProduct);

/**
 * DELETE /api/products/:id (admin)
 */
router.delete('/:id', authMiddleware, adminOnly, productController.deleteProduct);

module.exports = router;
