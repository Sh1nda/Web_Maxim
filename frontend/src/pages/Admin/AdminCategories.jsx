import { useEffect, useState } from 'react';
import api from '../../api/axios';

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');

  async function loadCategories() {
    const res = await api.get('/categories');
    setCategories(res.data.data);
  }

  async function createCategory() {
    await api.post('/categories', { name: title, slug: code });
    setTitle('');
    setCode('');
    loadCategories();
  }

  async function removeCategory(id) {
    await api.delete(`/categories/${id}`);
    loadCategories();
  }

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <section className="max-w-5xl mx-auto py-14 px-4">
      <h1 className="text-4xl font-semibold text-slate-900 mb-10 tracking-tight">
        Категории мебели
      </h1>

      {/* Создание категории */}
      <div className="bg-white p-8 rounded-2xl shadow-md border border-slate-200 mb-10">
        <h2 className="text-2xl font-medium text-slate-800 mb-6">
          Добавить новую категорию
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            className="px-4 py-3 rounded-lg border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 outline-none transition"
            placeholder="Название категории"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="px-4 py-3 rounded-lg border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 outline-none transition"
            placeholder="Код категории (slug)"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <button
            onClick={createCategory}
            className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg px-6 py-3 font-medium transition"
          >
            Создать
          </button>
        </div>
      </div>

      {/* Таблица категорий */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow-md border border-slate-200">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-100 text-slate-700">
              <th className="p-4 font-medium">ID</th>
              <th className="p-4 font-medium">Название</th>
              <th className="p-4 font-medium">Slug</th>
              <th className="p-4 font-medium">Действия</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id} className="border-t border-slate-200">
                <td className="p-4">{cat.id}</td>
                <td className="p-4">{cat.name}</td>
                <td className="p-4">{cat.slug}</td>
                <td className="p-4">
                  <button
                    onClick={() => removeCategory(cat.id)}
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
