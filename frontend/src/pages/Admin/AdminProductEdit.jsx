import { useEffect, useState } from 'react';
import { getProduct } from '../../api/products';
import api from '../../api/axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function AdminProductEdit() {
  const { id } = useParams();
  const isNew = id === 'new';
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    slug: '',
    description: '',
    price: '',
    stock: '',
    imageUrl: '',
    categoryId: ''
  });

  useEffect(() => {
    if (!isNew) {
      getProduct(id).then((res) => setForm(res.data.data));
    }
  }, [id]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (isNew) {
      await api.post('/products', form);
    } else {
      await api.put(`/products/${id}`, form);
    }

    navigate('/admin/products');
  }

  return (
    <section className="max-w-4xl mx-auto py-14 px-4">
      <h1 className="text-4xl font-bold text-slate-100 mb-10 tracking-tight">
        {isNew ? 'Добавить устройство' : 'Редактировать устройство'}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-slate-950 text-slate-100 p-10 rounded-2xl shadow-xl border border-slate-800 flex flex-col gap-6"
      >
        <div className="flex flex-col gap-2">
          <label className="font-medium">Название устройства</label>
          <input
            className="px-4 py-3 rounded-lg bg-slate-900 border border-slate-700"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium">Slug</label>
          <input
            className="px-4 py-3 rounded-lg bg-slate-900 border border-slate-700"
            name="slug"
            value={form.slug}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium">Описание</label>
          <textarea
            className="px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 h-32 resize-none"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-medium">Цена</label>
            <input
              className="px-4 py-3 rounded-lg bg-slate-900 border border-slate-700"
              name="price"
              value={form.price}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium">Остаток</label>
            <input
              className="px-4 py-3 rounded-lg bg-slate-900 border border-slate-700"
              name="stock"
              value={form.stock}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium">URL изображения</label>
          <input
            className="px-4 py-3 rounded-lg bg-slate-900 border border-slate-700"
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium">ID категории</label>
          <input
            className="px-4 py-3 rounded-lg bg-slate-900 border border-slate-700"
            name="categoryId"
            value={form.categoryId}
            onChange={handleChange}
          />
        </div>

        <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-lg font-semibold transition">
          {isNew ? 'Создать устройство' : 'Сохранить изменения'}
        </button>
      </form>
    </section>
  );
}
