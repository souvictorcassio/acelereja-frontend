import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/InstitutionRegister.css";

export default function InstitutionRegister() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    nome: "",
    codigoINEP: "",
    estado: "",
    cidade: "",
    bairro: "",
    rua: "",
    numero: "",
    cep: "",
    telefone: "",
    email: "",
    senha: "",
    observacoes: "",
  });

  const [turnos, setTurnos] = useState([]);
  const [niveis, setNiveis] = useState([]);
  const [admissao, setAdmissao] = useState("");
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e, setState) => {
    const { value, checked } = e.target;
    setState((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensagem("");

    try {
      const governoId = user?.tipo === "GOVERNO" ? user.governoId : null;

      const response = await fetch(
        "http://localhost:3000/api/instituicao/cadastrar",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            turnos: turnos.join(","),
            niveis: niveis.join(","),
            admissao,
            governoId,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMensagem("✅ Instituição cadastrada com sucesso!");
        setFormData({
          nome: "",
          codigoINEP: "",
          estado: "",
          cidade: "",
          bairro: "",
          rua: "",
          numero: "",
          cep: "",
          telefone: "",
          email: "",
          senha: "",
          observacoes: "",
        });
        setTurnos([]);
        setNiveis([]);
        setAdmissao("");
      } else {
        setMensagem(`⚠️ Erro: ${data.erro || "Não foi possível cadastrar."}`);
      }
    } catch (err) {
      setMensagem("❌ Erro ao conectar com o servidor.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="institution-container">
      <div className="institution-card">
        <h2>Cadastro de Instituição de Ensino</h2>
        <p>
          Preencha as informações abaixo para cadastrar uma instituição da rede
          estadual no AcelerEJA.
        </p>

        {mensagem && (
          <div
            style={{
              backgroundColor: mensagem.startsWith("✅")
                ? "#dcfce7"
                : "#fee2e2",
              color: mensagem.startsWith("✅") ? "#166534" : "#991b1b",
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "10px",
            }}
          >
            {mensagem}
          </div>
        )}

        <form onSubmit={handleSubmit} className="institution-form">
          <div className="form-grid">
            <input
              type="text"
              name="nome"
              placeholder="Nome da instituição"
              value={formData.nome}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="codigoINEP"
              placeholder="Código INEP"
              value={formData.codigoINEP}
              onChange={handleInputChange}
              required
            />
            <select
              name="estado"
              value={formData.estado}
              onChange={handleInputChange}
              required
            >
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
              value={formData.cidade}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="bairro"
              placeholder="Bairro"
              value={formData.bairro}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="rua"
              placeholder="Rua"
              value={formData.rua}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="numero"
              placeholder="Número"
              value={formData.numero}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="cep"
              placeholder="CEP"
              value={formData.cep}
              onChange={handleInputChange}
              required
            />
            <input
              type="tel"
              name="telefone"
              placeholder="Telefone da instituição"
              value={formData.telefone}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="E-mail institucional"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              name="senha"
              placeholder="Crie uma senha"
              value={formData.senha}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Turnos */}
          <div className="checkbox-group">
            <label className="checkbox-title">Turnos disponíveis:</label>
            <div className="checkbox-options">
              {["Matutino", "Vespertino", "Noturno"].map((t) => (
                <label key={t}>
                  <input
                    type="checkbox"
                    value={t}
                    checked={turnos.includes(t)}
                    onChange={(e) => handleCheckboxChange(e, setTurnos)}
                  />
                  {t}
                </label>
              ))}
            </div>
          </div>

          {/* Níveis */}
          <div className="checkbox-group">
            <label className="checkbox-title">
              Níveis de escolaridade ofertados (EJA):
            </label>
            <div className="checkbox-options">
              {[
                "Ensino Fundamental - Anos Finais",
                "Ensino Fundamental - Anos Iniciais",
                "Ensino Médio",
              ].map((n) => (
                <label key={n}>
                  <input
                    type="checkbox"
                    value={n}
                    checked={niveis.includes(n)}
                    onChange={(e) => handleCheckboxChange(e, setNiveis)}
                  />
                  {n}
                </label>
              ))}
            </div>
          </div>

          {/* Admissão */}
          <div className="checkbox-group">
            <label className="checkbox-title">
              Tipo de admissão de matrícula:
            </label>
            <div className="radio-options">
              {["Online", "Presencial", "Ambas"].map((tipo) => (
                <label key={tipo}>
                  <input
                    type="radio"
                    name="admissao"
                    value={tipo}
                    checked={admissao === tipo}
                    onChange={(e) => setAdmissao(e.target.value)}
                    required
                  />
                  {tipo}
                </label>
              ))}
            </div>
          </div>

          <textarea
            name="observacoes"
            placeholder="Observações ou informações adicionais"
            rows="4"
            value={formData.observacoes}
            onChange={handleInputChange}
          ></textarea>

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? "Cadastrando..." : "Cadastrar Instituição"}
          </button>
        </form>
      </div>
    </div>
  );
}
