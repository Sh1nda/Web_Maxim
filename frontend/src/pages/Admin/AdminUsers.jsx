import { useEffect, useState } from 'react';
import api from '../../api/axios';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  async function loadUsers() {
    const res = await api.get('/users');
    setUsers(res.data.data);
  }

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <section className="max-w-6xl mx-auto py-14 px-4">
      <h1 className="text-4xl font-semibold text-slate-900 mb-10 tracking-tight">
        Пользователи
      </h1>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-md border border-slate-200">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-100 text-slate-700">
              <th className="p-4 font-medium">ID</th>
              <th className="p-4 font-medium">Email</th>
              <th className="p-4 font-medium">Имя</th>
              <th className="p-4 font-medium">Роль</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t border-slate-200">
                <td className="p-4">{user.id}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">{user.name}</td>
                <td className="p-4">
                  <span
                    className={
                      user.role === 'ADMIN'
                        ? 'px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg font-medium'
                        : 'px-3 py-1 bg-slate-200 text-slate-700 rounded-lg font-medium'
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
