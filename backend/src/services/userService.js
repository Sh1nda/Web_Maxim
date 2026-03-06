// backend/src/services/userService.js
const prisma = require('../config/prisma');
const { hashPassword } = require('../utils/password');

async function createUser({ email, password, name, role = 'CUSTOMER' }) {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    const error = new Error('Пользователь с таким email уже существует');
    error.status = 400;
    throw error;
  }

  const passwordHash = await hashPassword(password);

  return prisma.user.create({
    data: {
      email,
      password: passwordHash,
      name,
      role
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true
    }
  });
}

async function getUserByEmail(email) {
  return prisma.user.findUnique({ where: { email } });
}

async function getUserById(id) {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true
    }
  });
}

async function listUsers() {
  return prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true
    },
    orderBy: { createdAt: 'desc' }
  });
}

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  listUsers
};
