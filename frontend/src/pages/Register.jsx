import { useState, useContext } from 'react';
import { register as apiRegister } from '../api/auth';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await apiRegister(email, password, name);
    login(res.data.data.token);
    navigate('/');
  }

  return (
    <section className="max-w-md mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold text-slate-900 mb-8 tracking-tight">
        Регистрация в TechGear Store
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 bg-slate-900 text-slate-100 p-8 rounded-2xl shadow-xl border border-slate-700"
      >
        <div className="flex flex-col gap-2">
          <label className="font-medium">Ваше имя</label>
          <input
            className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none transition"
            placeholder="Введите имя"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium">Email</label>
          <input
            className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none transition"
            placeholder="Введите email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium">Пароль</label>
          <input
            className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none transition"
            placeholder="Введите пароль"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-lg font-semibold transition"
        >
          Создать аккаунт
        </button>
      </form>
    </div>
  );
}
