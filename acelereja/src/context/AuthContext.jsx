import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Carrega o usuário do localStorage ao iniciar o app
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Login: salva usuário no estado e no localStorage
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    if (userData.tipo === "INSTITUICAO" && userData.instituicaoId) {
      localStorage.setItem("instituicaoId", userData.instituicaoId);
    }
  };

  // Logout: limpa tudo
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("instituicaoId");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook para facilitar o uso
export function useAuth() {
  return useContext(AuthContext);
}
