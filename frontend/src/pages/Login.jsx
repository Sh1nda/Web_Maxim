import { useState, useContext } from 'react';
import { login as apiLogin } from '../api/auth';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await apiLogin(email, password);
    login(res.data.data.token);
    navigate('/');
  }

  return (
    <section className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900 mb-6 tracking-tight">
          Вход в TechGear Store
        </h1>

        <div className="bg-slate-950 text-slate-50 rounded-2xl p-6 mb-4 border border-slate-800">
          <p className="text-sm text-slate-200">
            Войдите в аккаунт, чтобы оформлять заказы, просматривать историю покупок
            и управлять своим профилем.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 bg-white p-7 rounded-2xl shadow-md border border-slate-200"
        >
          <div className="flex flex-col gap-1.5">
            <label className="text-slate-700 text-sm font-medium">
              Электронная почта
            </label>
            <input
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 outline-none text-sm transition"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-slate-700 text-sm font-medium">
              Пароль
            </label>
            <input
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 outline-none text-sm transition"
              placeholder="Введите пароль"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="w-full py-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold transition"
          >
            Войти в аккаунт
          </button>
        </form>
      </div>
    </section>
  );
}
