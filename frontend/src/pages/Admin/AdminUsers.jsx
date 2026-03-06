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
    <div>
      <h1 className="text-3xl font-bold text-amber-800 mb-6">Пользователи</h1>

      <table className="w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-3">ID</th>
            <th className="p-3">Email</th>
            <th className="p-3">Имя</th>
            <th className="p-3">Роль</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-t">
              <td className="p-3">{u.id}</td>
              <td className="p-3">{u.email}</td>
              <td className="p-3">{u.name}</td>
              <td className="p-3">{u.role}</td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}
