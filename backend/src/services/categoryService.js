// backend/src/services/categoryService.js
const prisma = require('../config/prisma');

async function listCategories() {
  return prisma.category.findMany({
    orderBy: { name: 'asc' }
  });
}

async function getCategoryById(id) {
  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) {
    const error = new Error('Категория не найдена');
    error.status = 404;
    throw error;
  }
  return category;
}

async function createCategory({ name, slug }) {
  return prisma.category.create({
    data: { name, slug }
  });
}

async function updateCategory(id, { name, slug }) {
  return prisma.category.update({
    where: { id },
    data: { name, slug }
  });
}

async function deleteCategory(id) {
  return prisma.category.delete({ where: { id } });
}

module.exports = {
  listCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};
