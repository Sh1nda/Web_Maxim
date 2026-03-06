import { useEffect, useState } from 'react';
import { getProducts } from '../../api/products';
import api from '../../api/axios';
import { Link } from 'react-router-dom';

export default function AdminProducts() {
  const [items, setItems] = useState([]);

  async function load() {
    const res = await getProducts();
    setItems(res.data.data.items);
  }

  async function deleteProduct(id) {
    if (!confirm("Удалить товар?")) return;
    await api.delete(`/products/${id}`);
    load();
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-amber-800">Товары</h1>
        <Link to="/admin/products/new" className="btn btn-primary">
          + Добавить товар
        </Link>
      </div>

      <table className="w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-3">ID</th>
            <th className="p-3">Название</th>
            <th className="p-3">Цена</th>
            <th className="p-3">Остаток</th>
            <th className="p-3">Действия</th>
          </tr>
        </thead>

        <tbody>
          {items.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="p-3">{p.id}</td>
              <td className="p-3">{p.name}</td>
              <td className="p-3">{p.price} ₽</td>
              <td className="p-3">{p.stock}</td>
              <td className="p-3 flex gap-3">
                <Link
                  to={`/admin/products/${p.id}`}
                  className="btn btn-secondary"
                >
                  Редактировать
                </Link>

                <button
                  className="btn btn-danger"
                  onClick={() => deleteProduct(p.id)}
                >
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}
