import { useEffect, useState } from 'react';
import api from '../../api/axios';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  async function load() {
    const res = await api.get('/orders');
    setOrders(res.data.data);
  }

  async function updateStatus(id, status) {
    await api.patch(`/orders/${id}/status`, { status });
    load();
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <section className="max-w-6xl mx-auto py-14 px-4">
      <h1 className="text-4xl font-bold text-slate-100 mb-10 tracking-tight">
        Управление заказами устройств
      </h1>

      <div className="flex flex-col gap-10">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-700"
          >
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-2xl font-semibold text-slate-100">
                Заказ №{order.id}
              </h2>

              <span className="px-4 py-1 rounded-full bg-blue-600 text-white text-sm font-medium">
                {order.status}
              </span>
            </div>

            <p className="text-lg text-slate-300">
              Покупатель:{' '}
              <span className="font-medium">{order.user?.email}</span>
            </p>

            <p className="text-lg text-slate-300 mt-1">
              Сумма:{' '}
              <span className="font-semibold text-emerald-400">
                {order.total} ₽
              </span>
            </p>

            <ul className="mt-6 flex flex-col gap-3">
              {order.items.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between bg-slate-800 p-4 rounded-xl border border-slate-700"
                >
                  <span className="text-slate-100">{item.product.name}</span>
                  <span className="text-slate-400">× {item.quantity}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3 mt-6">
              {['PENDING', 'PAID', 'SHIPPED', 'COMPLETED', 'CANCELED'].map(
                (status) => (
                  <button
                    key={status}
                    onClick={() => updateStatus(order.id, status)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
                  >
                    {status}
                  </button>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
