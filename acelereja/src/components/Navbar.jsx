import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="logo">AcelerEJA</div>

      <div className={`nav-links ${open ? "open" : ""}`}>
        <Link to="/">Início</Link>
        <Link to="/sobre">Sobre</Link>
        <Link to="/faq">Perguntas Frequentes</Link>

        {!user && (
          <Link to="/login">
            <button className="btn-login-nav">Entrar</button>
          </Link>
        )}

        {user?.tipo === "GOVERNO" && (
          <>
            <Link to="/instituicoes">Escolas</Link>
            <Link to="/instituicao/cadastro">Cadastrar</Link>
            <Link to="/gov-dashboard">Resumo</Link>
            <button onClick={handleLogout} className="btn-login-nav">
              Sair
            </button>
          </>
        )}

        {user?.tipo === "POPULACAO" && (
          <>
            <Link to="/instituicoes">Escolas</Link>
            <Link to="/profile">Perfil</Link>
            <button onClick={handleLogout} className="btn-login-nav">
              Sair
            </button>
          </>
        )}

        {user?.tipo === "INSTITUICAO" && (
          <>
            <Link to="/instituicoes">Escolas</Link>
            <Link to="/institution-dashboard">Resumo</Link>
            <button onClick={handleLogout} className="btn-login-nav">
              Sair
            </button>
          </>
        )}
      </div>

      <div className="hamburger" onClick={() => setOpen(!open)}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </nav>
  );
}
