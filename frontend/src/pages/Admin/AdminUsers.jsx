import { useEffect, useState } from 'react';
import api from '../../api/axios';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  async function load() {
    const res = await api.get('/users');
    setUsers(res.data.data);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <section className="max-w-7xl mx-auto py-14 px-4">
      <h1 className="text-4xl font-bold text-slate-100 mb-10 tracking-tight">
        Пользователи TechGear Store
      </h1>

      <div className="overflow-x-auto bg-slate-900 rounded-2xl shadow-xl border border-slate-700">
        <table className="w-full text-left text-slate-100">
          <thead>
            <tr className="bg-slate-800 text-slate-300">
              <th className="p-4 font-medium">ID</th>
              <th className="p-4 font-medium">Email</th>
              <th className="p-4 font-medium">Имя</th>
              <th className="p-4 font-medium">Роль</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t border-slate-700">
                <td className="p-4">{user.id}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">{user.name}</td>
                <td className="p-4">
                  <span
                    className={
                      user.role === 'ADMIN'
                        ? 'px-3 py-1 bg-blue-600 text-white rounded-lg font-medium'
                        : 'px-3 py-1 bg-slate-700 text-slate-200 rounded-lg font-medium'
                    }
                  >
                    {user.role}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </section>
  );
}
