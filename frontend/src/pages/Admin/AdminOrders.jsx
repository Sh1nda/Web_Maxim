import { useEffect, useState } from 'react';
import api from '../../api/axios';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  async function loadOrders() {
    const res = await api.get('/orders');
    setOrders(res.data.data);
  }

  async function changeStatus(id, status) {
    await api.patch(`/orders/${id}/status`, { status });
    loadOrders();
  }

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <section className="max-w-6xl mx-auto py-14 px-4">
      <h1 className="text-4xl font-semibold text-slate-900 mb-10 tracking-tight">
        Управление заказами
      </h1>

      <div className="flex flex-col gap-8">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white p-8 rounded-2xl shadow-md border border-slate-200"
          >
            {/* Заголовок заказа */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-slate-800">
                Заказ №{order.id}
              </h2>

              <span className="px-4 py-1 rounded-full bg-slate-100 text-slate-700 text-sm font-medium">
                {order.status}
              </span>
            </div>

            {/* Информация о заказе */}
            <p className="text-slate-700 text-lg">
              Покупатель:{" "}
              <span className="font-medium">{order.user.email}</span>
            </p>

            <p className="text-slate-700 text-lg mt-1">
              Сумма заказа:{" "}
              <span className="font-semibold text-emerald-700">
                {order.total} ₽
              </span>
            </p>

            {/* Список товаров */}
            <ul className="mt-5 flex flex-col gap-3">
              {order.items.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between bg-slate-50 p-4 rounded-xl border border-slate-200"
                >
                  <span className="font-medium text-slate-800">
                    {item.product.title}
                  </span>
                  <span className="text-slate-600">× {item.quantity}</span>
                </li>
              ))}
            </ul>

            {/* Кнопки изменения статуса */}
            <div className="flex flex-wrap gap-3 mt-6">
              {["PENDING", "PAID", "SHIPPED", "COMPLETED", "CANCELED"].map(
                (status) => (
                  <button
                    key={status}
                    onClick={() => changeStatus(order.id, status)}
                    className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg font-medium transition"
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
