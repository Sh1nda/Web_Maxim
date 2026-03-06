import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { items, removeFromCart } = useContext(CartContext);

  const total = items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold text-amber-800 mb-6">Корзина</h1>

      {items.length === 0 ? (
        <p className="text-gray-600">Корзина пуста</p>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            {items.map((i) => (
              <div
                key={i.product.id}
                className="card flex justify-between items-center"
              >
                <span>
                  {i.product.name} × {i.quantity}
                </span>

                <button
                  onClick={() => removeFromCart(i.product.id)}
                  className="btn btn-danger"
                >
                  Удалить
                </button>
              </div>
            ))}
          </div>

          <p className="text-2xl font-bold mt-6">Итого: {total} ₽</p>

          <Link to="/checkout" className="btn btn-primary mt-4 inline-block">
            Оформить заказ
          </Link>
        </>
      )}
    </div>
  );
}
