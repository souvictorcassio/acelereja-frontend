// ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Componente para proteger rotas.
 * - redireciona para /login se o usuário não estiver autenticado
 * - opcionalmente, limita o acesso por tipo de usuário (GOVERNO, INSTITUICAO, POPULACAO)
 */
export default function ProtectedRoute({ children, allowedTypes }) {
  const { user } = useAuth();

  // se não estiver logado, redireciona
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // se o tipo não for permitido, redireciona para home
  if (allowedTypes && !allowedTypes.includes(user.tipo)) {
    return <Navigate to="/" replace />;
  }

  // caso contrário, exibe a rota
  return children;
}
