import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { items, removeFromCart } = useContext(CartContext);

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <section className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-semibold text-slate-800 mb-10 tracking-wide">
        Корзина мебели
      </h1>

      {items.length === 0 ? (
        <div className="bg-slate-100 p-6 rounded-lg shadow-sm text-slate-600">
          Ваша корзина пуста. Добавьте мебель, чтобы продолжить покупку.
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="flex items-center justify-between bg-white p-5 rounded-xl shadow-md border border-slate-200"
            >
              <div className="flex flex-col">
                <span className="text-lg font-medium text-slate-800">
                  {item.product.title}
                </span>
                <span className="text-sm text-slate-500">
                  Количество: {item.quantity}
                </span>
              </div>

              <button
                onClick={() => removeFromCart(item.product.id)}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
              >
                Удалить
              </button>
            </div>
          ))}

          <div className="mt-8 flex items-center justify-between bg-slate-50 p-6 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-2xl font-semibold text-slate-800">
              Общая стоимость:
            </span>
            <span className="text-3xl font-bold text-emerald-600">
              {total} ₽
            </span>
          </div>

          <Link
            to="/checkout"
            className="mt-6 inline-block text-center bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-8 rounded-xl text-lg font-medium transition"
          >
            Перейти к оформлению
          </Link>
        </div>
      )}
    </section>
  );
}
