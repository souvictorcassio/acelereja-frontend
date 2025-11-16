import { useState } from "react";
import "../styles/Register.css";

export default function Register() {
  const [userType, setUserType] = useState("populacao");
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const endpoint =
        userType === "populacao"
          ? "https://acelereja-backend.onrender.com/api/populacao/cadastrar"
          : "https://acelereja-backend.onrender.com/api/governo/cadastrar";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Cadastro realizado com sucesso!");
        setFormData({});
        e.target.reset();
      } else if (data.error?.includes("email") || data.error?.includes("cpf")) {
        setMessage("⚠️ E-mail ou CPF já cadastrados.");
      } else {
        setMessage(`❌ Erro: ${data.error || "Falha ao cadastrar"}`);
      }
    } catch (error) {
      setMessage("⚠️ Erro de conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Crie sua conta no AcelerEJA</h2>
        <p>Escolha seu tipo de usuário e preencha os dados abaixo.</p>

        <div className="user-type-selector">
          <button
            className={userType === "populacao" ? "active" : ""}
            onClick={() => setUserType("populacao")}
          >
            População
          </button>
          <button
            className={userType === "governo" ? "active" : ""}
            onClick={() => setUserType("governo")}
          >
            Governo
          </button>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          {userType === "populacao" && (
            <div className="form-grid">
              <input
                type="text"
                name="nome"
                placeholder="Nome completo"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="cpf"
                placeholder="CPF"
                onChange={handleChange}
                required
              />
              <input
                type="date"
                name="dataNascimento"
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="E-mail"
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="telefone"
                placeholder="Telefone"
                onChange={handleChange}
                required
              />

              <select name="estado" onChange={handleChange} required>
                <option value="">Estado (UF)</option>
                {[
                  "AC",
                  "AL",
                  "AP",
                  "AM",
                  "BA",
                  "CE",
                  "DF",
                  "ES",
                  "GO",
                  "MA",
                  "MT",
                  "MS",
                  "MG",
                  "PA",
                  "PB",
                  "PR",
                  "PE",
                  "PI",
                  "RJ",
                  "RN",
                  "RS",
                  "RO",
                  "RR",
                  "SC",
                  "SP",
                  "SE",
                  "TO",
                ].map((uf) => (
                  <option key={uf} value={uf}>
                    {uf}
                  </option>
                ))}
              </select>

              <input
                type="text"
                name="cidade"
                placeholder="Cidade"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="bairro"
                placeholder="Bairro"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="endereco"
                placeholder="Rua e número"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="cep"
                placeholder="CEP"
                onChange={handleChange}
                required
              />

              <select name="escolaridade" onChange={handleChange} required>
                <option value="">Grau de escolaridade atual</option>
                <option>Não alfabetizado</option>
                <option>Ensino Fundamental Incompleto</option>
                <option>Ensino Fundamental Completo</option>
                <option>Ensino Médio Incompleto</option>
              </select>

              <input
                type="password"
                name="senha"
                placeholder="Senha"
                onChange={handleChange}
                required
              />
            </div>
          )}

          {userType === "governo" && (
            <div className="form-grid">
              <input
                type="text"
                name="nomeResponsavel"
                placeholder="Nome completo do responsável"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="cargo"
                placeholder="Cargo / Função"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="secretaria"
                placeholder="Secretaria de Educação Estadual"
                onChange={handleChange}
                required
              />
              <select name="estado" onChange={handleChange} required>
                <option value="">UF</option>
                {[
                  "AC",
                  "AL",
                  "AP",
                  "AM",
                  "BA",
                  "CE",
                  "DF",
                  "ES",
                  "GO",
                  "MA",
                  "MT",
                  "MS",
                  "MG",
                  "PA",
                  "PB",
                  "PR",
                  "PE",
                  "PI",
                  "RJ",
                  "RN",
                  "RS",
                  "RO",
                  "RR",
                  "SC",
                  "SP",
                  "SE",
                  "TO",
                ].map((uf) => (
                  <option key={uf} value={uf}>
                    {uf}
                  </option>
                ))}
              </select>
              <input
                type="email"
                name="email"
                placeholder="E-mail institucional"
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="telefone"
                placeholder="Telefone institucional"
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="senha"
                placeholder="Senha"
                onChange={handleChange}
                required
              />
            </div>
          )}

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>

        {message && <p className="form-message">{message}</p>}

        <p className="redirect">
          Já tem uma conta? <a href="/login">Faça login</a>
        </p>
      </div>
    </div>
  );
}
