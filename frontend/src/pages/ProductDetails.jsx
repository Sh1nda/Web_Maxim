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

  if (!product) return <p className="p-6">Загрузка...</p>;

  return (
    <div className="container py-10 max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        <img
          src={product.imageUrl}
          alt={product.name}
          className="rounded-lg shadow-md w-full h-80 object-cover"
        />

        <div>
          <h1 className="text-3xl font-bold text-amber-800">{product.name}</h1>

          <p className="text-gray-700 mt-4">{product.description}</p>

          <p className="text-3xl font-bold text-amber-700 mt-6">
            {product.price} ₽
          </p>

          <button
            onClick={() => addToCart(product)}
            className="btn btn-primary mt-6"
          >
            Добавить в корзину
          </button>
        </div>

      </div>
    </div>
  );
}
