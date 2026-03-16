import { Link, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function AdminLayout() {
  const { user } = useContext(AuthContext);

  if (!user || user.role !== 'ADMIN') {
    return (
      <div className="p-10 text-center text-red-600 text-xl">
        Доступ к административной панели ограничён
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50">

      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-200 shadow-sm p-8 flex flex-col">
        <h2 className="text-2xl font-semibold text-slate-900 mb-10 tracking-tight">
          Управление магазином
        </h2>

        <nav className="flex flex-col gap-4 text-slate-700 text-lg">
          <Link
            to="/admin"
            className="hover:text-emerald-700 transition"
          >
            Главная
          </Link>

          <Link
            to="/admin/products"
            className="hover:text-emerald-700 transition"
          >
            Мебель
          </Link>

          <Link
            to="/admin/categories"
            className="hover:text-emerald-700 transition"
          >
            Категории
          </Link>

          <Link
            to="/admin/orders"
            className="hover:text-emerald-700 transition"
          >
            Заказы
          </Link>

          <Link
            to="/admin/users"
            className="hover:text-emerald-700 transition"
          >
            Пользователи
          </Link>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-12">
        <Outlet />
      </main>

    </div>
  );
}
