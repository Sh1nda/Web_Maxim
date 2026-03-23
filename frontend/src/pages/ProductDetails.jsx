import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { getProduct } from '../api/products';
import { CartContext } from '../context/CartContext';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    getProduct(id).then((res) => setProduct(res.data.data));
  }, [id]);

  if (!product) {
    return (
      <div className="p-10 text-slate-300 text-lg">
        Загрузка информации об устройстве...
      </div>
    );
  }

  return (
    <section className="max-w-6xl mx-auto py-14 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

        <img
          src={product.imageUrl}
          alt={product.name}
          className="rounded-2xl shadow-xl w-full h-96 object-cover border border-slate-700"
        />

        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-100 tracking-tight">
              {product.name}
            </h1>

            <p className="text-slate-300 mt-6 leading-relaxed text-lg">
              {product.description}
            </p>

            <p className="text-4xl font-extrabold text-emerald-400 mt-10">
              {product.price} ₽
            </p>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="mt-12 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-lg font-semibold transition"
          >
            Добавить в корзину
          </button>
        </div>

      </div>
    </section>
  );
}
