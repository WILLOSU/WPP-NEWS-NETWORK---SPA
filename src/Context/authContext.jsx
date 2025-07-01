"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserService } from "../Services/userServices";

const routeAuth = "https://wpp-news-network-api.onrender.com";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [messageError, setMessageError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const userLog = JSON.parse(localStorage.getItem("localStorage"));

    if (userLog?.token && userLog?.id) {
      const getUser = async () => {
        try {
          const response = await getUserService(userLog.id, userLog.token);

          if (!response.ok) {
            const errorData = await response.json();
            console.error(errorData.message || response.statusText);
            throw new Error(
              errorData.message || "Falha na autenticação ao buscar usuário."
            );
          }

          const userData = await response.json();

          const userWithRole = {
            ...userData,
            role: userLog.role,
          };

          setUser(userWithRole); // ← Use userWithRole ao invés de userData
          setToken(userLog.token);
          setMessageError(null);
        } catch (error) {
          setMessageError(
            "Sua sessão expirou ou é inválida. Faça o Login novamente!"
          );
          signOut();
        }
      };

      getUser();
    } else {
      signOut();
    }
  }, []);

  async function signIn(userLogin) {
    try {
      const response = await fetch(`${routeAuth}/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userLogin),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessageError(data.message || "Erro desconhecido no login.");
        return;
      }

      const { token: _token, user: _user } = data;

      const _localStorage = {
        token: _token,
        id: _user.id,
        role: _user.role,
      };

      const _localStorageString = JSON.stringify(_localStorage);

      localStorage.setItem("localStorage", _localStorageString);

      setToken(_token);
      setUser(_user);
      setMessageError(null);

      return _user;
    } catch (error) {
      setMessageError(
        "Ocorreu um erro ao tentar fazer login. Tente novamente."
      );
    }
  }

  function signOut() {
    localStorage.removeItem("localStorage");
    setToken(null);
    setUser(null);
    setMessageError(null);
    navigate("/");

  }

  function isAuthenticated() {
    return !!token && !!user;
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        isAuthenticated,
        user,
        token,
        messageError,
        setMessageError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
