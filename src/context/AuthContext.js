import React, { createContext, useContext, useState } from 'react';
import { loadUser, saveUser } from '../utils/storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async (username, password) => {
    const trimmedUser = username.trim();
    if (!trimmedUser || !password) {
      return { success: false, error: 'empty' };
    }

    const storedUser = await loadUser();

    if (!storedUser) {
      const newUser = { username: trimmedUser, password };
      await saveUser(newUser);
      setUser(newUser);
      setIsLoggedIn(true);
      return { success: true, isNew: true };
    }

    if (storedUser.username === trimmedUser && storedUser.password === password) {
      setUser(storedUser);
      setIsLoggedIn(true);
      return { success: true, isNew: false };
    }

    return { success: false, error: 'invalid' };
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  const updateUser = async (newUser) => {
    await saveUser(newUser);
    setUser(newUser);
  };

  const restoreUser = (userData) => {
    setUser(userData);
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn, login, logout, updateUser, restoreUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
