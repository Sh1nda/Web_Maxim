import { useEffect, useState } from 'react';
import { getMyOrders } from '../api/orders';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getMyOrders().then((res) => setOrders(res.data.data));
  }, []);

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold text-amber-800 mb-6">Мои заказы</h1>

      {orders.length === 0 ? (
        <p className="text-gray-600">У вас пока нет заказов</p>
      ) : (
        <div className="flex flex-col gap-6">
          {orders.map((order) => (
            <div key={order.id} className="card">
              <p className="text-xl font-bold">Заказ №{order.id}</p>
              <p className="text-gray-700 mt-1">Статус: {order.status}</p>
              <p className="text-gray-700">Сумма: {order.total} ₽</p>

              <ul className="mt-3 text-gray-800">
                {order.items.map((i) => (
                  <li key={i.id}>
                    {i.product.name} × {i.quantity}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
