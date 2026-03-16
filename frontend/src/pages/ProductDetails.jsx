import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { getProduct } from '../api/products';
import { CartContext } from '../context/CartContext';

export default function ProductDetails() {
  const { id } = useParams();
  const [itemData, setItemData] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    getProduct(id).then((res) => {
      const p = res.data.data;

      setItemData({
        id: p.id,
        title: p.name,
        description: p.description,
        price: Number(p.price),
        image: p.imageUrl,
        categoryId: p.categoryId
      });
    });
  }, [id]);

  if (!itemData) {
    return (
      <div className="p-10 text-slate-600 text-lg">
        Загрузка информации о мебели...
      </div>
    );
  }

  return (
    <section className="max-w-5xl mx-auto py-14 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        <img
          src={itemData.image}
          alt={itemData.title}
          className="rounded-2xl shadow-lg w-full h-96 object-cover border border-slate-200"
        />

        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-semibold text-slate-900 tracking-tight">
              {itemData.title}
            </h1>

            <p className="text-slate-600 mt-5 leading-relaxed text-lg">
              {itemData.description}
            </p>

            <p className="text-3xl font-bold text-emerald-700 mt-8">
              {itemData.price} ₽
            </p>
          </div>

          <button
            onClick={() => addToCart(itemData)}
            className="mt-10 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-lg font-medium transition"
          >
            Добавить в корзину
          </button>
        </div>

      </div>
    </section>
  );
}
