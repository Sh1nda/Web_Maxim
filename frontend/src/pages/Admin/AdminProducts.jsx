import { useEffect, useState } from 'react';
import { getProducts } from '../../api/products';
import api from '../../api/axios';
import { Link } from 'react-router-dom';

export default function AdminProducts() {
  const [furniture, setFurniture] = useState([]);

  async function loadFurniture() {
    const res = await getProducts();

    // API отдаёт name, price (Decimal), stock
    const items = res.data.data.items.map(p => ({
      id: p.id,
      name: p.name,
      price: Number(p.price),
      stock: p.stock
    }));

    setFurniture(items);
  }

  async function removeProduct(id) {
    if (!confirm("Удалить этот товар мебели?")) return;
    await api.delete(`/products/${id}`);
    loadFurniture();
  }

  useEffect(() => {
    loadFurniture();
  }, []);

  return (
    <section className="max-w-6xl mx-auto py-14 px-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-semibold text-slate-900 tracking-tight">
          Мебель
        </h1>

        <Link
          to="/admin/products/new"
          className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition"
        >
          + Добавить мебель
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow-md border border-slate-200">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-100 text-slate-700">
              <th className="p-4 font-medium">ID</th>
              <th className="p-4 font-medium">Название</th>
              <th className="p-4 font-medium">Цена</th>
              <th className="p-4 font-medium">Остаток</th>
              <th className="p-4 font-medium">Действия</th>
            </tr>
          </thead>

          <tbody>
            {furniture.map((item) => (
              <tr key={item.id} className="border-t border-slate-200">
                <td className="p-4">{item.id}</td>
                <td className="p-4">{item.name}</td>
                <td className="p-4">{item.price} ₽</td>
                <td className="p-4">{item.stock}</td>
                <td className="p-4 flex gap-3">
                  <Link
                    to={`/admin/products/${item.id}`}
                    className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg transition"
                  >
                    Редактировать
                  </Link>

                  <button
                    onClick={() => removeProduct(item.id)}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
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
