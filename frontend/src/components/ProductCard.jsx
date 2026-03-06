import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <div className="card">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="h-48 w-full object-cover rounded-md"
      />

      <h3 className="text-lg font-semibold mt-3">{product.name}</h3>
      <p className="text-amber-800 font-bold text-xl mt-1">{product.price} ₽</p>

      <Link
        to={`/products/${product.id}`}
        className="btn btn-primary mt-3 inline-block"
      >
        Подробнее
      </Link>
    </div>
  );
}
