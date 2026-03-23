import { useEffect, useState } from 'react';
import { getProducts } from '../../api/products';
import api from '../../api/axios';
import { Link } from 'react-router-dom';

export default function AdminProducts() {
  const [devices, setDevices] = useState([]);

  async function loadDevices() {
    const res = await getProducts();

    const items = res.data.data.items.map(p => ({
      id: p.id,
      name: p.name,
      price: Number(p.price),
      stock: p.stock
    }));

    setDevices(items);
  }

  async function removeProduct(id) {
    if (!confirm("Удалить это устройство?")) return;
    await api.delete(`/products/${id}`);
    loadDevices();
  }

  useEffect(() => {
    loadDevices();
  }, []);

  return (
    <section className="max-w-7xl mx-auto py-14 px-4">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
          Устройства
        </h1>

        <Link
          to="/admin/products/new"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition"
        >
          + Добавить устройство
        </Link>
      </div>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-xl border border-slate-200">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-100 text-slate-700">
              <th className="p-4 font-medium">ID</th>
              <th className="p-4 font-medium">Название</th>
              <th className="p-4 font-medium">Цена</th>
              <th className="p-4 font-medium">Остаток</th>
              <th className="p-4 font-medium">Действия</th>
            </tr>
          ))}
        </tbody>

          <tbody>
            {devices.map((item) => (
              <tr key={item.id} className="border-t border-slate-200">
                <td className="p-4">{item.id}</td>
                <td className="p-4">{item.name}</td>
                <td className="p-4">{item.price} ₽</td>
                <td className="p-4">{item.stock}</td>
                <td className="p-4 flex gap-3">
                  <Link
                    to={`/admin/products/${item.id}`}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition"
                  >
                    Редактировать
                  </Link>

                  <button
                    onClick={() => removeProduct(item.id)}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </section>
  );
}
