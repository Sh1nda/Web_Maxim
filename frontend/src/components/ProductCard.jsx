import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <div className="bg-slate-900 rounded-2xl shadow-lg border border-slate-800 p-5 flex flex-col">
      <img
        src={product.image}
        alt={product.title}
        className="h-52 w-full object-cover rounded-xl mb-4 border border-slate-700"
      />

      <h3 className="text-xl font-semibold text-slate-100">
        {product.title}
      </h3>

      <p className="text-indigo-400 font-bold text-2xl mt-2">
        {product.price} ₽
      </p>

      <Link
        to={`/products/${product.id}`}
        className="mt-4 inline-block px-5 py-3 bg-indigo-600 hover:bg-indigo-700 
                   text-white rounded-lg text-center font-medium transition"
      >
        Подробнее
      </Link>
    </div>
  );
}
