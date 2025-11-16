import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // <-- pegando função do contexto

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    try {
      const response = await fetch(
        "https://acelereja-backend.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, senha }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setErro(data.error || "Erro ao realizar login.");
        return;
      }

      // Salva no contexto (isso também salva no localStorage)
      login(data.user);

      // Redireciona com base no tipo
      if (data.user.tipo === "GOVERNO") navigate("/gov-dashboard");
      else if (data.user.tipo === "POPULACAO") navigate("/profile");
      else if (data.user.tipo === "INSTITUICAO")
        navigate("/institution-dashboard");
      else navigate("/");
    } catch (error) {
      console.error("Erro no login:", error);
      setErro("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Bem-vindo ao AcelerEJA</h2>
        <p>Faça login para acessar sua conta.</p>

        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          {erro && <p style={{ color: "red", fontSize: "0.9rem" }}>{erro}</p>}
          <button type="submit" className="btn-login">
            Entrar
          </button>
        </form>

        <p className="redirect">
          Ainda não tem conta? <a href="/register">Cadastre-se</a>
        </p>
      </div>
    </div>
  );
}
