import { useEffect, useState } from 'react';
import { getProducts } from '../api/products';
import { getCategories } from '../api/categories';
import ProductList from '../components/ProductList';
import CategoryList from '../components/CategoryList';

export default function Products() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);

  async function load() {
    const res = await getProducts();
    setItems(res.data.data.items);
  }

  async function loadCategories() {
    const res = await getCategories();
    setCategories(res.data.data);
  }

  async function filterByCategory(id) {
    const res = await getProducts({ categoryId: id });
    setItems(res.data.data.items);
  }

  useEffect(() => {
    load();
    loadCategories();
  }, []);

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold text-amber-800 mb-6">Каталог товаров</h1>

      <CategoryList categories={categories} onSelect={filterByCategory} />

      <ProductList items={items} />
    </div>
  );
}
