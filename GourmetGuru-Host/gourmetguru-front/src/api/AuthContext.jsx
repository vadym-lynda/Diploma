import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext({
  isAuthorised: "",
  setToken: () => {},
  deleteToken: () => {}
});

export const AuthProvider = ({ children }) => {
  const [isAuthorised, setIsAuthorised] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthorised(token);
    }
  }, []);

  const setToken = (token) => {
    
    localStorage.setItem('token', token);
    setIsAuthorised(token);
  };

  const deleteToken = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_sub');
    localStorage.removeItem('user_email');
    setIsAuthorised(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthorised, setToken, deleteToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
