import { useEffect, useState } from 'react';
import api from '../../api/axios';

export default function AdminCategories() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');

  async function load() {
    const res = await api.get('/categories');
    setItems(res.data.data);
  }

  async function createCategory() {
    if (!name || !slug) return;
    await api.post('/categories', { name, slug });
    setName('');
    setSlug('');
    load();
  }

  async function deleteCategory(id) {
    await api.delete(`/categories/${id}`);
    load();
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <section className="max-w-6xl mx-auto py-14 px-4">
      <h1 className="text-4xl font-bold text-slate-100 mb-10 tracking-tight">
        Категории компьютерных девайсов
      </h1>

      {/* Создание категории */}
      <div className="bg-slate-950 text-slate-100 p-8 rounded-2xl shadow-xl border border-slate-800 mb-12">
        <h2 className="text-2xl font-semibold mb-6">
          Добавить новую категорию
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            className="px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 
                       focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none transition"
            placeholder="Название категории"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 
                       focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none transition"
            placeholder="Slug категории"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />

          <button
            onClick={createCategory}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-3 font-medium transition"
          >
            Создать
          </button>
        </div>
      </div>

      {/* Таблица категорий */}
      <table className="w-full bg-slate-900 text-slate-100 shadow-md rounded-lg border border-slate-800">
        <thead>
          <tr className="bg-slate-800 text-left">
            <th className="p-3">ID</th>
            <th className="p-3">Название</th>
            <th className="p-3">Slug</th>
            <th className="p-3">Действия</th>
          </tr>
        </thead>

        <tbody>
          {items.map((cat) => (
            <tr key={cat.id} className="border-t border-slate-700">
              <td className="p-4">{cat.id}</td>
              <td className="p-4">{cat.name}</td>
              <td className="p-4">{cat.slug}</td>
              <td className="p-4">
                <button
                  onClick={() => deleteCategory(cat.id)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                >
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
