import { Link, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function AdminLayout() {
  const { user } = useContext(AuthContext);

  if (!user || user.role !== 'ADMIN') {
    return <p className="p-6 text-red-600">Доступ запрещён</p>;
  }

  return (
    <div className="flex min-h-screen bg-slate-900 text-slate-100">

      {/* Sidebar */}
      <aside className="w-72 bg-slate-950 border-r border-slate-800 shadow-xl p-8 flex flex-col">
        <h2 className="text-2xl font-bold mb-10 tracking-tight text-blue-400">
          TechGear Admin
        </h2>

        <nav className="flex flex-col gap-4 text-lg">
          <Link to="/admin" className="hover:text-blue-400 transition">
            Главная
          </Link>

          <Link to="/admin/products" className="hover:text-blue-400 transition">
            Устройства
          </Link>

          <Link to="/admin/categories" className="hover:text-blue-400 transition">
            Категории
          </Link>

          <Link to="/admin/orders" className="hover:text-blue-400 transition">
            Заказы
          </Link>

          <Link to="/admin/users" className="hover:text-blue-400 transition">
            Пользователи
          </Link>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-12 bg-slate-50 text-slate-900">
        <Outlet />
      </main>

    </div>
  );
}
