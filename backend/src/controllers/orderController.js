// backend/src/controllers/orderController.js
const orderService = require('../services/orderService');

async function createOrder(req, res, next) {
  try {
    const userId = req.user.id;
    const { items } = req.body;
    const order = await orderService.createOrder(userId, items);
    res.status(201).json({
      success: true,
      data: order
    });
  } catch (err) {
    next(err);
  }
}

async function listMyOrders(req, res, next) {
  try {
    const userId = req.user.id;
    const orders = await orderService.listOrdersForUser(userId);
    res.json({
      success: true,
      data: orders
    });
  } catch (err) {
    next(err);
  }
}

async function listAllOrders(req, res, next) {
  try {
    const orders = await orderService.listAllOrders();
    res.json({
      success: true,
      data: orders
    });
  } catch (err) {
    next(err);
  }
}

async function updateOrderStatus(req, res, next) {
  try {
    const orderId = Number(req.params.id);
    const { status } = req.body;
    const order = await orderService.updateOrderStatus(orderId, status);
    res.json({
      success: true,
      data: order
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createOrder,
  listMyOrders,
  listAllOrders,
  updateOrderStatus
};
