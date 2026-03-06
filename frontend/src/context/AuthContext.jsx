import { createContext, useEffect, useState } from 'react';
import { getMe } from '../api/users';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  async function loadUser() {
    try {
      const res = await getMe();
      setUser(res.data.data);
    } catch {
      setUser(null);
    }
  }

  useEffect(() => {
    if (localStorage.getItem('token')) loadUser();
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    loadUser();
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
