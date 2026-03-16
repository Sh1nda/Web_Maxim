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
      title: p.name,          // фронтенд ждёт title
      price: Number(p.price), // Decimal → number
      stock: p.stock,
      image: p.imageUrl,      // фронтенд ждёт image
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
    <section className="max-w-6xl mx-auto py-14 px-4">
      <h1 className="text-4xl font-semibold text-slate-900 mb-10 tracking-tight">
        Каталог мебели
      </h1>

      <div className="mb-10">
        <CategoryList categories={categories} onSelect={filterByCategory} />
      </div>

      <ProductList items={furniture} />
    </section>
  );
}
