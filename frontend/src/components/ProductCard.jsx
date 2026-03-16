import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-5 flex flex-col">
      <img
        src={product.image}
        alt={product.title}
        className="h-56 w-full object-cover rounded-xl mb-4"
      />

      <h3 className="text-xl font-semibold text-slate-900">
        {product.title}
      </h3>

      <p className="text-emerald-700 font-bold text-2xl mt-2">
        {product.price} ₽
      </p>

      <Link
        to={`/products/${product.id}`}
        className="mt-4 inline-block px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-center font-medium transition"
      >
        Подробнее
      </Link>
    </div>
  );
}
