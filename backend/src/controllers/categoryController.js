// backend/src/controllers/categoryController.js
const categoryService = require('../services/categoryService');

async function listCategories(req, res, next) {
  try {
    const categories = await categoryService.listCategories();
    res.json({
      success: true,
      data: categories
    });
  } catch (err) {
    next(err);
  }
}

async function getCategory(req, res, next) {
  try {
    const id = Number(req.params.id);
    const category = await categoryService.getCategoryById(id);
    res.json({
      success: true,
      data: category
    });
  } catch (err) {
    next(err);
  }
}

async function createCategory(req, res, next) {
  try {
    const { name, slug } = req.body;
    const category = await categoryService.createCategory({ name, slug });
    res.status(201).json({
      success: true,
      data: category
    });
  } catch (err) {
    next(err);
  }
}

async function updateCategory(req, res, next) {
  try {
    const id = Number(req.params.id);
    const { name, slug } = req.body;
    const category = await categoryService.updateCategory(id, { name, slug });
    res.json({
      success: true,
      data: category
    });
  } catch (err) {
    next(err);
  }
}

async function deleteCategory(req, res, next) {
  try {
    const id = Number(req.params.id);
    await categoryService.deleteCategory(id);
    res.json({
      success: true,
      message: 'Категория удалена'
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
};
