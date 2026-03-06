// backend/src/services/orderService.js
const prisma = require('../config/prisma');

/**
 * Создание заказа с позициями.
 * items: [{ productId, quantity }]
 */
async function createOrder(userId, items) {
  if (!items || !Array.isArray(items) || items.length === 0) {
    const error = new Error('Список товаров пуст');
    error.status = 400;
    throw error;
  }

  const productIds = items.map((i) => i.productId);
  const products = await prisma.product.findMany({
    where: { id: { in: productIds } }
  });

  if (products.length !== items.length) {
    const error = new Error('Некоторые товары не найдены');
    error.status = 400;
    throw error;
  }

  let total = 0;
  const orderItemsData = [];

  for (const item of items) {
    const product = products.find((p) => p.id === item.productId);
    if (!product) continue;

    if (product.stock < item.quantity) {
      const error = new Error(
        `Недостаточно товара на складе: ${product.name}`
      );
      error.status = 400;
      throw error;
    }

    const price = Number(product.price);
    total += price * item.quantity;

    orderItemsData.push({
      productId: product.id,
      quantity: item.quantity,
      price
    });
  }

  const order = await prisma.$transaction(async (tx) => {
    const createdOrder = await tx.order.create({
      data: {
        userId,
        total,
        status: 'PENDING',
        items: {
          create: orderItemsData
        }
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });

    // уменьшаем остатки
    for (const item of orderItemsData) {
      await tx.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            decrement: item.quantity
          }
        }
      });
    }

    return createdOrder;
  });

  return order;
}

async function listOrdersForUser(userId) {
  return prisma.order.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    include: {
      items: {
        include: {
          product: true
        }
      }
    }
  });
}

async function listAllOrders() {
  return prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      user: true,
      items: {
        include: {
          product: true
        }
      }
    }
  });
}

async function updateOrderStatus(orderId, status) {
  return prisma.order.update({
    where: { id: orderId },
    data: { status },
    include: {
      user: true,
      items: {
        include: {
          product: true
        }
      }
    }
  });
}

module.exports = {
  createOrder,
  listOrdersForUser,
  listAllOrders,
  updateOrderStatus
};
