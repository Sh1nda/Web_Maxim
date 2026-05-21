import { useEffect, useState } from 'react';
import { getProducts } from '../api/products';
import { getCategories } from '../api/categories';
import ProductList from '../components/ProductList';
import CategoryList from '../components/CategoryList';

export default function Products() {
  const [devices, setDevices] = useState([]);
  const [categories, setCategories] = useState([]);

  async function loadDevices() {
    const res = await getProducts();

    const items = res.data.data.items.map(p => ({
      id: p.id,
      title: p.name,
      description: p.description,
      price: Number(p.price),
      stock: p.stock,
      image: p.imageUrl,
      categoryId: p.categoryId
    }));

    setDevices(items);
  }

  async function loadCategories() {
    const res = await getCategories();
    setCategories(res.data.data);
  }

  async function filterByCategory(categoryId) {
    const res = await getProducts({ categoryId });

    const items = res.data.data.items.map(p => ({
      id: p.id,
      title: p.name,
      description: p.description,
      price: Number(p.price),
      stock: p.stock,
      image: p.imageUrl,
      categoryId: p.categoryId
    }));

    setDevices(items);
  }

  useEffect(() => {
    loadDevices();
    loadCategories();
  }, []);

  return (
    <section className="max-w-7xl mx-auto py-14 px-4 text-slate-100">

      <h1 className="text-4xl font-bold text-slate-100 mb-12 tracking-tight text-center">
        Каталог компьютерных девайсов
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Sidebar */}
        <aside className="md:col-span-1 bg-slate-950 text-slate-100 p-6 rounded-2xl shadow-lg border border-slate-800 h-fit sticky top-10">
          <h2 className="text-xl font-semibold mb-4">
            Категории устройств
          </h2>

          <CategoryList categories={categories} onSelect={filterByCategory} />
        </aside>

        {/* Products */}
        <div className="md:col-span-3">
          <ProductList items={devices} />
        </div>

      </div>
    </section>
  );
}
