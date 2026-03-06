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
    <div className="max-w-xl">
      <h1 className="text-3xl font-bold text-amber-800 mb-6">
        {isNew ? 'Создать товар' : 'Редактировать товар'}
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <input className="input" name="name" placeholder="Название"
          value={form.name} onChange={handleChange} />

        <input className="input" name="slug" placeholder="Slug"
          value={form.slug} onChange={handleChange} />

        <textarea className="input" name="description" placeholder="Описание"
          value={form.description} onChange={handleChange} />

        <input className="input" name="price" placeholder="Цена"
          value={form.price} onChange={handleChange} />

        <input className="input" name="stock" placeholder="Остаток"
          value={form.stock} onChange={handleChange} />

        <input className="input" name="imageUrl" placeholder="URL изображения"
          value={form.imageUrl} onChange={handleChange} />

        <input className="input" name="categoryId" placeholder="ID категории"
          value={form.categoryId} onChange={handleChange} />

        <button className="btn btn-primary w-full">
          {isNew ? 'Создать' : 'Сохранить'}
        </button>

      </form>
    </div>
  );
}
