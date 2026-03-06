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
    <div>
      <h1 className="text-3xl font-bold text-amber-800 mb-6">Категории</h1>

      <div className="card mb-6">
        <h2 className="text-xl font-bold mb-3">Создать категорию</h2>

        <div className="flex gap-3">
          <input className="input" placeholder="Название"
            value={name} onChange={(e) => setName(e.target.value)} />

          <input className="input" placeholder="Slug"
            value={slug} onChange={(e) => setSlug(e.target.value)} />

          <button className="btn btn-primary" onClick={createCategory}>
            Добавить
          </button>
        </div>
      </div>

      <table className="w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-3">ID</th>
            <th className="p-3">Название</th>
            <th className="p-3">Slug</th>
            <th className="p-3">Действия</th>
          </tr>
        </thead>

        <tbody>
          {items.map((c) => (
            <tr key={c.id} className="border-t">
              <td className="p-3">{c.id}</td>
              <td className="p-3">{c.name}</td>
              <td className="p-3">{c.slug}</td>
              <td className="p-3">
                <button
                  className="btn btn-danger"
                  onClick={() => deleteCategory(c.id)}
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
