// backend/src/services/authService.js
const { comparePassword } = require('../utils/password');
const { generateToken } = require('../utils/jwt');
const userService = require('./userService');

async function register({ email, password, name }) {
  const user = await userService.createUser({ email, password, name });
  const token = generateToken({
    id: user.id,
    email: user.email,
    role: user.role
  });

  return { user, token };
}

async function login({ email, password }) {
  const user = await userService.getUserByEmail(email);
  if (!user) {
    const error = new Error('Неверный email или пароль');
    error.status = 401;
    throw error;
  }

  const isValid = await comparePassword(password, user.password);
  if (!isValid) {
    const error = new Error('Неверный email или пароль');
    error.status = 401;
    throw error;
  }

  const token = generateToken({
    id: user.id,
    email: user.email,
    role: user.role
  });

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt
    },
    token
  };
}

module.exports = {
  register,
  login
};
