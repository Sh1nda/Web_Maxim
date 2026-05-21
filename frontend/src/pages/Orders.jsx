import { useEffect, useState } from 'react';
import { getMyOrders } from '../api/orders';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getMyOrders().then((res) => {
      const formatted = res.data.data.map(order => ({
        ...order,
        items: order.items.map(item => ({
          ...item,
          product: {
            ...item.product,
            title: item.product.name,
            image: item.product.imageUrl
          }
        }))
      }));

      setOrders(formatted);
    });
  }, []);

  return (
    <section className="max-w-5xl mx-auto py-14 px-4">
      <h1 className="text-4xl font-bold text-slate-100 mb-10 tracking-tight">
        Мои заказы устройств
      </h1>

      {orders.length === 0 ? (
        <div className="bg-slate-900 text-slate-200 p-8 rounded-xl border border-slate-700 shadow-lg">
          У вас пока нет заказов.
        </div>
      ) : (
        <div className="flex flex-col gap-10">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-slate-900 p-7 rounded-2xl shadow-md border border-slate-700"
            >
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-2xl font-semibold text-slate-100">
                  Заказ №{order.id}
                </h2>

                <span className="px-4 py-1 rounded-full bg-blue-600 text-white text-sm font-medium">
                  {order.status}
                </span>
              </div>

              <p className="text-lg text-slate-300 mb-4">
                Итоговая сумма:{' '}
                <span className="font-semibold text-emerald-400">
                  {order.total} ₽
                </span>
              </p>

              <ul className="flex flex-col gap-3">
                {order.items.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between bg-slate-800 p-4 rounded-xl border border-slate-700"
                  >
                    <span className="font-medium text-slate-100">
                      {item.product.title}
                    </span>
                    <span className="text-slate-400">× {item.quantity}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
