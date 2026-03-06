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
    <div className="container py-10 max-w-md">
      <h1 className="text-3xl font-bold mb-6 text-amber-800">Регистрация</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className="input"
          placeholder="Имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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

        <button className="btn btn-primary w-full">Создать аккаунт</button>
      </form>
    </div>
  );
}
