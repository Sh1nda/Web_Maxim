import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { createOrder } from '../api/orders';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { items, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  async function handleOrder() {
    const payload = items.map((i) => ({
      productId: i.product.id,
      quantity: i.quantity
    }));

    await createOrder(payload);
    clearCart();
    navigate('/orders');
  }

  const total = items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );

  return (
    <div className="container py-10 max-w-xl">
      <h1 className="text-3xl font-bold text-amber-800 mb-6">
        Оформление заказа
      </h1>

      {items.length === 0 ? (
        <p className="text-gray-600">Корзина пуста</p>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            {items.map((i) => (
              <div key={i.product.id} className="card flex justify-between">
                <span>{i.product.name} × {i.quantity}</span>
                <span className="font-bold">{i.product.price * i.quantity} ₽</span>
              </div>
            ))}
          </div>

          <p className="text-2xl font-bold mt-6">Итого: {total} ₽</p>

          <button
            onClick={handleOrder}
            className="btn btn-primary w-full mt-6"
          >
            Подтвердить заказ
          </button>
        </>
      )}
    </div>
  );
}
