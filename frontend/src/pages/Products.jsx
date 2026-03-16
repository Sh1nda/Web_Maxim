import { useEffect, useState } from 'react';
import { getProducts } from '../api/products';
import { getCategories } from '../api/categories';
import ProductList from '../components/ProductList';
import CategoryList from '../components/CategoryList';

export default function Products() {
  const [furniture, setFurniture] = useState([]);
  const [categories, setCategories] = useState([]);

  async function loadFurniture() {
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

    setFurniture(items);
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

    setFurniture(items);
  }

  useEffect(() => {
    loadFurniture();
    loadCategories();
  }, []);

  return (
    <section className="max-w-7xl mx-auto py-14 px-4">

      <h1 className="text-4xl font-semibold text-slate-900 mb-12 tracking-tight text-center">
        Каталог мебели
      </h1>

      {/* Новый layout: категории слева, товары справа */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Левая колонка — категории */}
        <aside className="md:col-span-1 bg-white p-6 rounded-2xl shadow-md border border-slate-200 h-fit sticky top-10">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            Категории
          </h2>

          <CategoryList categories={categories} onSelect={filterByCategory} />
        </aside>

        {/* Правая колонка — товары */}
        <div className="md:col-span-3">
          <ProductList items={furniture} />
        </div>

      </div>
    </section>
  );
}
