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
    <div className="container py-10 max-w-md">
      <h1 className="text-3xl font-bold mb-6 text-amber-800">Вход</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className="input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="input"
          placeholder="Пароль"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-primary w-full">Войти</button>
      </form>
    </div>
  );
}
