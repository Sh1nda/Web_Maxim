// backend/src/controllers/userController.js
const userService = require('../services/userService');

async function me(req, res, next) {
  try {
    const user = await userService.getUserById(req.user.id);
    res.json({
      success: true,
      data: user
    });
  } catch (err) {
    next(err);
  }
}

async function listUsers(req, res, next) {
  try {
    const users = await userService.listUsers();
    res.json({
      success: true,
      data: users
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  me,
  listUsers
};
