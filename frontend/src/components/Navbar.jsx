import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-slate-950 border-b border-slate-800 py-4 shadow-md">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

        {/* Лого */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight text-indigo-400"
        >
          TechGear Store
        </Link>

        {/* Навигация */}
        <div className="flex gap-8 items-center text-slate-200 text-lg">
          <Link to="/products" className="hover:text-indigo-400 transition">
            Каталог
          </Link>

          <Link to="/cart" className="hover:text-indigo-400 transition">
            Корзина
          </Link>

          {user && (
            <Link to="/orders" className="hover:text-indigo-400 transition">
              Мои заказы
            </Link>
          )}

          {user?.role === 'ADMIN' && (
            <Link to="/admin" className="hover:text-indigo-400 transition">
              Админ
            </Link>
          )}
        </div>

        {/* Правый блок */}
        <div className="flex gap-6 items-center text-slate-200 text-lg">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="font-medium text-indigo-300">
                {user.name}
              </span>

              <button
                onClick={logout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
              >
                Выйти
              </button>
            </>
          ) : (
            <div className="flex gap-6">
              <Link to="/login" className="hover:text-indigo-400 transition">
                Вход
              </Link>

              <Link to="/register" className="hover:text-indigo-400 transition">
                Регистрация
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
