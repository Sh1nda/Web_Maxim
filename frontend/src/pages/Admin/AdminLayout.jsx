import { Link, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function AdminLayout() {
  const { user } = useContext(AuthContext);

  if (!user || user.role !== 'ADMIN') {
    return <p className="p-6 text-red-600">Доступ запрещён</p>;
  }

  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6">
        <h2 className="text-xl font-bold text-amber-800 mb-6">Админ-панель</h2>

        <nav className="flex flex-col gap-3 text-gray-700">
          <Link to="/admin" className="hover:text-amber-700">Главная</Link>
          <Link to="/admin/products" className="hover:text-amber-700">Товары</Link>
          <Link to="/admin/categories" className="hover:text-amber-700">Категории</Link>
          <Link to="/admin/orders" className="hover:text-amber-700">Заказы</Link>
          <Link to="/admin/users" className="hover:text-amber-700">Пользователи</Link>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-10 bg-[#f7f5f2]">
        <Outlet />
      </main>

    </div>
  );
}
