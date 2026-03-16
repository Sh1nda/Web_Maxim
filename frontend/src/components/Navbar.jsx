import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white shadow-sm border-b border-slate-200 py-4">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

        {/* Левая часть */}
        <div className="flex gap-8 items-center text-slate-700 text-lg">
          <Link to="/products" className="hover:text-emerald-700 transition">
            Каталог
          </Link>

          <Link to="/cart" className="hover:text-emerald-700 transition">
            Корзина
          </Link>

          {user && (
            <Link to="/orders" className="hover:text-emerald-700 transition">
              Мои заказы
            </Link>
          )}
        </div>

        {/* Центр — Лого */}
        <Link
          to="/"
          className="text-3xl font-semibold tracking-tight text-slate-900 absolute left-1/2 -translate-x-1/2"
        >
          Furniture House
        </Link>

        {/* Правая часть */}
        <div className="flex gap-6 items-center text-slate-700 text-lg">

          {user?.role === 'ADMIN' && (
            <Link to="/admin" className="hover:text-emerald-700 transition">
              Администратор
            </Link>
          )}

          {user ? (
            <div className="flex items-center gap-4">
              <span className="font-medium text-slate-800">
                {user.name}
              </span>

              <button
                onClick={logout}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
              >
                Выйти
              </button>
            </div>
          ) : (
            <div className="flex gap-6">
              <Link to="/login" className="hover:text-emerald-700 transition">
                Вход
              </Link>

              <Link to="/register" className="hover:text-emerald-700 transition">
                Регистрация
              </Link>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
}
