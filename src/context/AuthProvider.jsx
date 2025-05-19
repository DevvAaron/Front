import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      const userData = JSON.parse(localStorage.getItem("usuario"));
      if (userData) {
        setUsuario(userData);
      }
    }
  }, [token]);

  const login = (data) => {
    setToken(data.token);
    setUsuario(data.usuario);
    localStorage.setItem("token", data.token);
    localStorage.setItem("usuario", JSON.stringify(data.usuario));
  };

  const logout = () => {
    setToken("");
    setUsuario(null);
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ usuario, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
