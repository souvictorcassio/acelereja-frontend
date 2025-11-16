import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/InstitutionsList.css";

export default function InstitutionsList() {
  const { user } = useAuth();
  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedEstado, setSelectedEstado] = useState("");
  const [selectedCidade, setSelectedCidade] = useState("");
  const [selectedBairro, setSelectedBairro] = useState("");
  const [filteredInstitutions, setFilteredInstitutions] = useState([]);
  const [selectedInstitution, setSelectedInstitution] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // 🔹 Buscar dados do backend
  useEffect(() => {
    async function fetchInstitutions() {
      try {
        const res = await fetch("http://localhost:3000/api/instituicao");
        if (!res.ok) throw new Error("Erro ao buscar instituições");
        const data = await res.json();
        setInstitutions(data);
        setFilteredInstitutions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchInstitutions();
  }, []);

  // 🔹 Aplicar filtros
  useEffect(() => {
    let filtered = institutions;
    if (selectedEstado)
      filtered = filtered.filter((i) => i.estado === selectedEstado);
    if (selectedCidade)
      filtered = filtered.filter((i) => i.cidade === selectedCidade);
    if (selectedBairro)
      filtered = filtered.filter((i) => i.bairro === selectedBairro);
    setFilteredInstitutions(filtered);
    setCurrentPage(1);
  }, [selectedEstado, selectedCidade, selectedBairro, institutions]);

  const estadosDisponiveis = [
    ...new Set(institutions.map((i) => i.estado)),
  ].sort();
  const cidadesDisponiveis = [
    ...new Set(
      institutions
        .filter((i) => !selectedEstado || i.estado === selectedEstado)
        .map((i) => i.cidade)
    ),
  ].sort();
  const bairrosDisponiveis = [
    ...new Set(
      institutions
        .filter(
          (i) =>
            (!selectedCidade && !selectedEstado) ||
            (selectedCidade && i.cidade === selectedCidade) ||
            (selectedEstado && i.estado === selectedEstado)
        )
        .map((i) => i.bairro)
    ),
  ].sort();

  const totalPages = Math.ceil(filteredInstitutions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentInstitutions = filteredInstitutions.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // 🔹 Função para realizar matrícula
  const handleMatricula = async (instituicaoId) => {
    if (!user) {
      alert("Faça login para realizar a matrícula.");
      return;
    }

    if (user.tipo !== "POPULACAO") {
      alert("Somente usuários da população podem realizar matrícula.");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:3000/api/instituicao/${instituicaoId}/matricular`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ populacaoId: user.populacaoId || user.id }),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.erro || "Erro ao realizar matrícula.");

      alert("✅ Matrícula realizada com sucesso!");
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  // 🔹 Exibição
  if (loading) return <p>Carregando instituições...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div className="institutions-container">
      <h2>Instituições Disponíveis para Matrícula</h2>
      <p className="subtitle">
        Selecione filtros para localizar escolas e polos do EJA disponíveis em
        sua região.
      </p>

      {/* filtros */}
      <div className="filters">
        <select
          value={selectedEstado}
          onChange={(e) => {
            setSelectedEstado(e.target.value);
            setSelectedCidade("");
            setSelectedBairro("");
          }}
        >
          <option value="">Estado</option>
          {estadosDisponiveis.map((estado) => (
            <option key={estado} value={estado}>
              {estado}
            </option>
          ))}
        </select>

        <select
          value={selectedCidade}
          onChange={(e) => {
            setSelectedCidade(e.target.value);
            setSelectedBairro("");
          }}
          disabled={!selectedEstado}
        >
          <option value="">Cidade</option>
          {cidadesDisponiveis.map((cidade) => (
            <option key={cidade} value={cidade}>
              {cidade}
            </option>
          ))}
        </select>

        <select
          value={selectedBairro}
          onChange={(e) => setSelectedBairro(e.target.value)}
          disabled={!selectedCidade}
        >
          <option value="">Bairro</option>
          {bairrosDisponiveis.map((bairro) => (
            <option key={bairro} value={bairro}>
              {bairro}
            </option>
          ))}
        </select>
      </div>

      {/* lista */}
      <div className="institutions-list">
        {currentInstitutions.length > 0 ? (
          currentInstitutions.map((inst) => (
            <div key={inst.id} className="institution-card">
              <h3>{inst.nome}</h3>
              <p className="address">
                {inst.rua}, {inst.numero} - {inst.bairro}, {inst.cidade} -{" "}
                {inst.estado}
              </p>
              <p>
                <strong>Telefone:</strong> {inst.telefone}
              </p>
              <p>
                <strong>Admissão:</strong> {inst.admissao}
              </p>
              <p className="observacoes-preview">
                {inst.observacoes?.slice(0, 80)}...
              </p>

              <div className="card-actions">
                <button
                  className="btn-details"
                  onClick={() => setSelectedInstitution(inst)}
                >
                  Ver Detalhes
                </button>

                {inst.admissao === "Online" && user?.tipo === "POPULACAO" && (
                  <button
                    className="btn-register"
                    onClick={() => handleMatricula(inst.id)}
                  >
                    Realizar Matrícula
                  </button>
                )}

                {inst.admissao === "Online" && user?.tipo !== "POPULACAO" && (
                  <p className="login-alert">
                    🔒 Faça login como cidadão para realizar matrícula.
                  </p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">
            Nenhuma instituição encontrada para os filtros selecionados.
          </p>
        )}
      </div>

      {/* paginação */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            ⬅ Anterior
          </button>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Próxima ➡
          </button>
        </div>
      )}

      {/* modal */}
      {selectedInstitution && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedInstitution(null)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{selectedInstitution.nome}</h3>
            <p>
              <strong>Endereço:</strong> {selectedInstitution.rua},{" "}
              {selectedInstitution.numero} - {selectedInstitution.bairro},{" "}
              {selectedInstitution.cidade} - {selectedInstitution.estado}
            </p>
            <p>
              <strong>Telefone:</strong> {selectedInstitution.telefone}
            </p>
            <p>
              <strong>E-mail:</strong> {selectedInstitution.email}
            </p>
            <p>
              <strong>Informações:</strong> {selectedInstitution.observacoes}
            </p>

            <iframe
              title="mapa"
              width="100%"
              height="250"
              style={{ borderRadius: "10px", marginTop: "10px" }}
              loading="lazy"
              allowFullScreen
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                `${selectedInstitution.rua}, ${selectedInstitution.numero}, ${selectedInstitution.cidade}`
              )}&output=embed`}
            ></iframe>

            <button
              className="btn-close"
              onClick={() => setSelectedInstitution(null)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
