// backend/src/services/productService.js
const prisma = require('../config/prisma');

async function listProducts({ categoryId, search, skip = 0, take = 20 }) {
  const where = {};

  if (categoryId) {
    where.categoryId = Number(categoryId);
  }

  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } }
    ];
  }

  const [items, total] = await Promise.all([
    prisma.product.findMany({
      where,
      skip: Number(skip),
      take: Number(take),
      orderBy: { createdAt: 'desc' },
      include: {
        category: true
      }
    }),
    prisma.product.count({ where })
  ]);

  return { items, total };
}

async function getProductById(id) {
  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true }
  });
  if (!product) {
    const error = new Error('Товар не найден');
    error.status = 404;
    throw error;
  }
  return product;
}

async function createProduct(data) {
  return prisma.product.create({
    data
  });
}

async function updateProduct(id, data) {
  return prisma.product.update({
    where: { id },
    data
  });
}

async function deleteProduct(id) {
  return prisma.product.delete({
    where: { id }
  });
}

module.exports = {
  listProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
