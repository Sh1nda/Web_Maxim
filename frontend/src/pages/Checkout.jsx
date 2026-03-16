import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { createOrder } from '../api/orders';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { items, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  async function handleOrder() {
    const orderData = items.map((item) => ({
      productId: item.product.id,
      quantity: item.quantity
    }));

    await createOrder(orderData);
    clearCart();
    navigate('/orders');
  }

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <section className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-semibold text-slate-800 mb-10">
        Подтверждение покупки
      </h1>

      {items.length === 0 ? (
        <div className="bg-slate-100 p-6 rounded-xl text-slate-600 shadow-sm">
          Ваша корзина пуста. Добавьте мебель, чтобы перейти к оформлению.
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="flex justify-between items-center bg-white p-5 rounded-xl shadow-md border border-slate-200"
            >
              <div className="flex flex-col">
                <span className="text-lg font-medium text-slate-800">
                  {item.product.title}
                </span>
                <span className="text-sm text-slate-500">
                  Количество: {item.quantity}
                </span>
              </div>

              <span className="text-xl font-semibold text-emerald-700">
                {item.product.price * item.quantity} ₽
              </span>
            </div>
          ))}

          <div className="mt-8 bg-slate-50 p-6 rounded-xl border border-slate-200 shadow-sm flex justify-between items-center">
            <span className="text-2xl font-semibold text-slate-800">
              Общая сумма:
            </span>
            <span className="text-3xl font-bold text-emerald-600">
              {total} ₽
            </span>
          </div>

          <button
            onClick={handleOrder}
            className="mt-8 w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl text-lg font-medium transition"
          >
            Завершить оформление
          </button>
        </div>
      )}
    </section>
  );
}
