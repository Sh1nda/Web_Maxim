import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-amber-800">
          Coffee Shop
        </Link>

        <div className="flex gap-6 items-center text-gray-700">

          <Link to="/products" className="hover:text-amber-700">Товары</Link>
          <Link to="/cart" className="hover:text-amber-700">Корзина</Link>

          {/*  Мои заказы — показываем только авторизованным */}
          {user && (
            <Link to="/orders" className="hover:text-amber-700">
              Мои заказы
            </Link>
          )}

          {/*  Админка — только для ADMIN */}
          {user?.role === 'ADMIN' && (
            <Link to="/admin" className="hover:text-amber-700">Админка</Link>
          )}

          {user ? (
            <>
              <span className="font-medium">{user.name}</span>
              <button onClick={logout} className="btn btn-danger">
                Выйти
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-amber-700">Вход</Link>
              <Link to="/register" className="hover:text-amber-700">Регистрация</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
