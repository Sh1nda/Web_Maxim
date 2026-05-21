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
    <section className="max-w-4xl mx-auto py-10 px-3 sm:px-6">
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-semibold text-slate-100 tracking-tight">
          Подтверждение заказа
        </h1>
        <p className="text-slate-400 mt-3 text-sm sm:text-base">
          Проверьте состав заказа перед финальным подтверждением.
        </p>
      </header>

      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-700 bg-slate-900 p-8 text-center">
          <p className="text-slate-300">
            Ваша корзина пуста. Добавьте устройства, чтобы перейти к оформлению.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="grid gap-4">
            {items.map((item) => (
              <article
                key={item.product.id}
                className="flex justify-between items-start bg-slate-900 border border-slate-700 rounded-xl p-4 shadow-sm"
              >
                <div>
                  <h2 className="text-lg font-semibold text-slate-100">
                    {item.product.name}
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">
                    Количество: <span className="font-medium">{item.quantity}</span>
                  </p>
                  <p className="text-sm text-slate-400 mt-1">
                    Цена: <span className="font-medium">{item.product.price} ₽</span>
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xs uppercase text-slate-400 tracking-[0.2em]">
                    Итого
                  </p>
                  <p className="text-xl font-semibold text-emerald-400 mt-1">
                    {item.product.price * item.quantity} ₽
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="bg-slate-900 text-white rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Общая сумма заказа
              </p>
              <p className="text-3xl font-bold mt-1">{total} ₽</p>
            </div>
            <button
              onClick={handleOrder}
              className="w-full sm:w-auto inline-flex justify-center items-center px-6 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-sm font-semibold transition"
            >
              Завершить оформление
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
