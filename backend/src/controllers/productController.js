// backend/src/controllers/productController.js
const productService = require('../services/productService');

async function listProducts(req, res, next) {
  try {
    const { categoryId, search, skip, take } = req.query;
    const result = await productService.listProducts({
      categoryId,
      search,
      skip,
      take
    });
    res.json({
      success: true,
      data: result
    });
  } catch (err) {
    next(err);
  }
}

async function getProduct(req, res, next) {
  try {
    const id = Number(req.params.id);
    const product = await productService.getProductById(id);
    res.json({
      success: true,
      data: product
    });
  } catch (err) {
    next(err);
  }
}

async function createProduct(req, res, next) {
  try {
    const {
      name,
      slug,
      description,
      price,
      stock,
      imageUrl,
      categoryId
    } = req.body;

    const product = await productService.createProduct({
      name,
      slug,
      description,
      price: Number(price),
      stock: Number(stock),
      imageUrl,
      categoryId: Number(categoryId)
    });

    res.status(201).json({
      success: true,
      data: product
    });
  } catch (err) {
    next(err);
  }
}

async function updateProduct(req, res, next) {
  try {
    const id = Number(req.params.id);
    const {
      name,
      slug,
      description,
      price,
      stock,
      imageUrl,
      categoryId
    } = req.body;

    const product = await productService.updateProduct(id, {
      name,
      slug,
      description,
      price: price !== undefined ? Number(price) : undefined,
      stock: stock !== undefined ? Number(stock) : undefined,
      imageUrl,
      categoryId: categoryId !== undefined ? Number(categoryId) : undefined
    });

    res.json({
      success: true,
      data: product
    });
  } catch (err) {
    next(err);
  }
}

async function deleteProduct(req, res, next) {
  try {
    const id = Number(req.params.id);
    await productService.deleteProduct(id);
    res.json({
      success: true,
      message: 'Товар удалён'
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
};
