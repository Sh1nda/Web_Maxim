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

    const response = await apiLogin(email, password);
    login(response.data.data.token);

    navigate('/');
  }

  return (
    <section className="max-w-md mx-auto py-16 px-6">
      <h1 className="text-4xl font-semibold text-slate-900 mb-8 tracking-tight">
        Вход в личный кабинет
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 bg-white p-8 rounded-2xl shadow-md border border-slate-200"
      >
        <div className="flex flex-col gap-2">
          <label className="text-slate-700 font-medium">Email</label>
          <input
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 outline-none transition"
            placeholder="Введите email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-slate-700 font-medium">Пароль</label>
          <input
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 outline-none transition"
            placeholder="Введите пароль"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-lg font-medium transition"
        >
          Войти
        </button>
      </form>
    </section>
  );
}
