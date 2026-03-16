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
            title: item.product.name,        // ← исправили
            image: item.product.imageUrl     // ← если понадобится
          }
        }))
      }));

      setOrders(formatted);
    });
  }, []);

  return (
    <section className="max-w-4xl mx-auto py-14 px-4">
      <h1 className="text-4xl font-semibold text-slate-900 mb-10 tracking-tight">
        Мои заказы мебели
      </h1>

      {orders.length === 0 ? (
        <div className="bg-slate-100 p-6 rounded-xl shadow-sm text-slate-600">
          У вас пока нет заказов. Вы можете оформить покупку в каталоге мебели.
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-6 rounded-2xl shadow-md border border-slate-200"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-slate-800">
                  Заказ №{order.id}
                </h2>
                <span className="text-sm px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 font-medium">
                  {order.status}
                </span>
              </div>

              <p className="text-lg text-slate-700 mb-2">
                Общая стоимость:{" "}
                <span className="font-semibold text-emerald-700">
                  {order.total} ₽
                </span>
              </p>

              <ul className="mt-4 flex flex-col gap-2 text-slate-700">
                {order.items.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between bg-slate-50 p-3 rounded-lg border border-slate-200"
                  >
                    <span className="font-medium">{item.product.title}</span>
                    <span className="text-slate-600">
                      × {item.quantity}
                    </span>
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
