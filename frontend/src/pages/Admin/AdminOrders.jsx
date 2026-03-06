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
    <div>
      <h1 className="text-3xl font-bold text-amber-800 mb-6">Заказы</h1>

      <div className="flex flex-col gap-6">
        {orders.map((o) => (
          <div key={o.id} className="card">
            <p className="text-xl font-bold">Заказ №{o.id}</p>
            <p>Пользователь: {o.user.email}</p>
            <p>Статус: {o.status}</p>
            <p>Сумма: {o.total} ₽</p>

            <div className="flex gap-3 mt-3">
              {['PENDING','PAID','SHIPPED','COMPLETED','CANCELED'].map(s => (
                <button
                  key={s}
                  className="btn btn-secondary"
                  onClick={() => updateStatus(o.id, s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
