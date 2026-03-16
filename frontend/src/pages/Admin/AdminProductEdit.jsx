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
      getProduct(id).then((res) => {
        const data = res.data.data;

        setForm({
          name: data.name,
          slug: data.slug,
          description: data.description,
          price: data.price,
          stock: data.stock,
          imageUrl: data.imageUrl,
          categoryId: data.categoryId
        });
      });
    }
  }, [id]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      name: form.name,
      slug: form.slug,
      description: form.description,
      price: Number(form.price),
      stock: Number(form.stock),
      imageUrl: form.imageUrl,
      categoryId: Number(form.categoryId)
    };

    if (isNew) {
      await api.post('/products', payload);
    } else {
      await api.put(`/products/${id}`, payload);
    }

    navigate('/admin/products');
  }

  return (
    <section className="max-w-3xl mx-auto py-14 px-4">
      <h1 className="text-4xl font-semibold text-slate-900 mb-10 tracking-tight">
        {isNew ? 'Добавить мебель' : 'Редактировать мебель'}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md border border-slate-200 flex flex-col gap-6"
      >
        <div className="flex flex-col gap-2">
          <label className="text-slate-700 font-medium">Название</label>
          <input
            className="px-4 py-3 rounded-lg border border-slate-300"
            name="name"
            placeholder="Название мебели"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-slate-700 font-medium">Slug</label>
          <input
            className="px-4 py-3 rounded-lg border border-slate-300"
            name="slug"
            placeholder="Уникальный код"
            value={form.slug}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-slate-700 font-medium">Описание</label>
          <textarea
            className="px-4 py-3 rounded-lg border border-slate-300 h-32 resize-none"
            name="description"
            placeholder="Описание товара"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-slate-700 font-medium">Цена</label>
            <input
              className="px-4 py-3 rounded-lg border border-slate-300"
              name="price"
              placeholder="Цена"
              value={form.price}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-slate-700 font-medium">Остаток</label>
            <input
              className="px-4 py-3 rounded-lg border border-slate-300"
              name="stock"
              placeholder="Количество на складе"
              value={form.stock}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-slate-700 font-medium">URL изображения</label>
          <input
            className="px-4 py-3 rounded-lg border border-slate-300"
            name="imageUrl"
            placeholder="Ссылка на изображение"
            value={form.imageUrl}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-slate-700 font-medium">ID категории</label>
          <input
            className="px-4 py-3 rounded-lg border border-slate-300"
            name="categoryId"
            placeholder="Введите ID категории"
            value={form.categoryId}
            onChange={handleChange}
          />
        </div>

        <button
          className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-lg font-medium transition"
        >
          {isNew ? 'Создать' : 'Сохранить изменения'}
        </button>
      </form>
    </section>
  );
}
