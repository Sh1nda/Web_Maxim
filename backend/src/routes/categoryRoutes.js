// backend/src/routes/categoryRoutes.js
const express = require('express');
const categoryController = require('../controllers/categoryController');
const { authMiddleware, adminOnly } = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * GET /api/categories
 */
router.get('/', categoryController.listCategories);

/**
 * GET /api/categories/:id
 */
router.get('/:id', categoryController.getCategory);

/**
 * POST /api/categories (admin)
 */
router.post('/', authMiddleware, adminOnly, categoryController.createCategory);

/**
 * PUT /api/categories/:id (admin)
 */
router.put('/:id', authMiddleware, adminOnly, categoryController.updateCategory);

/**
 * DELETE /api/categories/:id (admin)
 */
router.delete(
  '/:id',
  authMiddleware,
  adminOnly,
  categoryController.deleteCategory
);

module.exports = router;
