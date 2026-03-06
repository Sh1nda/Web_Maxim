import api from './axios';

export const createOrder = (items) =>
  api.post('/orders', { items });

export const getMyOrders = () =>
  api.get('/orders/my');
