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
    <section className="max-w-5xl mx-auto py-10 px-3 sm:px-6">
      <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-semibold text-slate-100 tracking-tight">
            Корзина устройств
          </h1>
          <p className="text-slate-400 mt-2 text-sm sm:text-base">
            Здесь собраны все выбранные вами комплектующие и периферия.
          </p>
        </div>

        {items.length > 0 && (
          <div className="text-right">
            <p className="text-xs uppercase text-slate-400 tracking-[0.2em]">
              Итоговая сумма
            </p>
            <p className="text-2xl font-bold text-emerald-400">{total} ₽</p>
          </div>
        )}
      </header>

      {items.length === 0 ? (
        <div className="border border-dashed border-slate-700 rounded-xl p-8 text-center bg-slate-900">
          <p className="text-slate-300 mb-2">
            Ваша корзина пуста. Добавьте комплектующие или аксессуары, чтобы продолжить.
          </p>
          <Link
            to="/"
            className="inline-flex mt-3 px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
          >
            Перейти к каталогу
          </Link>
        </div>
      ) : (
        <div className="grid gap-5">
          <div className="grid gap-4">
            {items.map((item) => (
              <article
                key={item.product.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-700 rounded-xl p-4 shadow-sm"
              >
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-slate-100">
                    {item.product.name}
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">
                    Количество: <span className="font-medium">{item.quantity}</span>
                  </p>
                  <p className="text-sm text-slate-400 mt-1">
                    Цена за единицу:{' '}
                    <span className="font-medium text-slate-200">
                      {item.product.price} ₽
                    </span>
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <p className="text-sm text-slate-400">
                    Сумма:{' '}
                    <span className="font-semibold text-emerald-400">
                      {item.product.price * item.quantity} ₽
                    </span>
                  </p>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="px-4 py-2 rounded-lg border border-red-500 text-red-500 text-sm font-medium hover:bg-red-500/10 transition"
                  >
                    Удалить из корзины
                  </button>
                </div>
              </article>
            ))}
          </div>

          <footer className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-slate-900 text-white rounded-xl p-5">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                Общая стоимость
              </p>
              <p className="text-3xl font-bold mt-1">{total} ₽</p>
            </div>

            <Link
              to="/checkout"
              className="inline-flex justify-center items-center px-6 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-sm font-semibold transition"
            >
              Перейти к оформлению заказа
            </Link>
          </footer>
        </div>
      )}
    </section>
  );
}
