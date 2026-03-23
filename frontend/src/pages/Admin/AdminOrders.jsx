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
      <h1 className="text-4xl font-bold text-slate-900 mb-10 tracking-tight">
        Управление заказами устройств
      </h1>

      <div className="flex flex-col gap-10">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200"
          >
            {/* Заголовок */}
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-2xl font-semibold text-slate-900">
                Заказ №{order.id}
              </h2>

              <span className="px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
                {order.status}
              </span>
            </div>

            {/* Информация */}
            <p className="text-lg text-slate-700">
              Покупатель:{' '}
              <span className="font-medium">{order.user?.email}</span>
            </p>

            <p className="text-lg text-slate-700 mt-1">
              Сумма:{' '}
              <span className="font-semibold text-emerald-600">
                {order.total} ₽
              </span>
            </p>

            {/* Товары */}
            <ul className="mt-6 flex flex-col gap-3">
              {order.items.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between bg-slate-50 p-4 rounded-xl border border-slate-200"
                >
                  {s}
                </button>
              ))}
            </ul>

            {/* Статусы */}
            <div className="flex flex-wrap gap-3 mt-6">
              {['PENDING', 'PAID', 'SHIPPED', 'COMPLETED', 'CANCELED'].map(
                (status) => (
                  <button
                    key={status}
                    onClick={() => changeStatus(order.id, status)}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-medium transition"
                  >
                    {status}
                  </button>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
