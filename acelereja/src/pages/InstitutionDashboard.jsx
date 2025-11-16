// InstitutionDashboard.jsx
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import "../styles/InstitutionDashboard.css";

export default function InstitutionDashboard() {
  const [requests, setRequests] = useState([]);
  const [metrics, setMetrics] = useState({
    total: 0,
    pendentes: 0,
    deferidos: 0,
    indeferidos: 0,
  });
  const [cpfBusca, setCpfBusca] = useState("");
  const [statusFiltro, setStatusFiltro] = useState("Todos");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 3;

  const instituicaoId = localStorage.getItem("instituicaoId"); // 🔑 obtém do login

  // 🔹 Carregar dados do backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/instituicao/${instituicaoId}/dashboard`
        );
        const data = await res.json();

        setRequests(data.matriculas || []);
        setMetrics({
          total: data.total,
          pendentes: data.pendentes,
          deferidos: data.deferidos,
          indeferidos: data.indeferidos,
        });
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
      }
    };

    fetchData();
  }, [instituicaoId]);

  // 🔹 Atualizar status
  const handleUpdateStatus = async (id, novoStatus) => {
    try {
      await fetch(
        `http://localhost:3000/api/instituicao/matricula/${id}/status`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: novoStatus }),
        }
      );

      setRequests((prev) =>
        prev.map((req) =>
          req.id === id ? { ...req, status: novoStatus } : req
        )
      );
    } catch (err) {
      console.error("Erro ao atualizar status:", err);
    }
  };

  const filteredRequests = requests.filter((req) => {
    const cpfMatch = req.cpf.includes(cpfBusca);
    const statusMatch = statusFiltro === "Todos" || req.status === statusFiltro;
    return cpfMatch && statusMatch;
  });

  const totalPaginas = Math.ceil(filteredRequests.length / itensPorPagina);
  const indexInicial = (paginaAtual - 1) * itensPorPagina;
  const pedidosPaginados = filteredRequests.slice(
    indexInicial,
    indexInicial + itensPorPagina
  );

  const data = [
    { name: "Deferidos", value: metrics.deferidos },
    { name: "Indeferidos", value: metrics.indeferidos },
    { name: "Pendentes", value: metrics.pendentes },
  ];

  return (
    <div className="institution-dashboard-container">
      <h2>Painel da Instituição</h2>
      <p className="subtitle">
        Acompanhe pedidos e métricas da sua instituição.
      </p>

      <div className="metrics">
        <div className="metric-card total">
          <h3>{metrics.total}</h3>
          <p>Total de Pedidos</p>
        </div>
        <div className="metric-card pending">
          <h3>{metrics.pendentes}</h3>
          <p>Pendentes</p>
        </div>
        <div className="metric-card approved">
          <h3>{metrics.deferidos}</h3>
          <p>Deferidos</p>
        </div>
        <div className="metric-card denied">
          <h3>{metrics.indeferidos}</h3>
          <p>Indeferidos</p>
        </div>
      </div>

      <div className="chart-section">
        <h3>Status das Matrículas</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#2563eb" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Buscar por CPF..."
          value={cpfBusca}
          onChange={(e) => setCpfBusca(e.target.value)}
        />
        <select
          value={statusFiltro}
          onChange={(e) => setStatusFiltro(e.target.value)}
        >
          <option value="Todos">Todos os Status</option>
          <option value="PENDENTE">Pendentes</option>
          <option value="DEFERIDA">Deferidos</option>
          <option value="INDEFERIDA">Indeferidos</option>
        </select>
      </div>

      <div className="requests-section">
        <h3>Pedidos de Matrícula</h3>
        <table className="requests-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>CPF</th>
              <th>Nível</th>
              <th>Contato</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pedidosPaginados.map((req) => (
              <tr key={req.id}>
                <td>{req.nome}</td>
                <td>{req.cpf}</td>
                <td>{req.nivel}</td>
                <td>
                  <a href={`tel:${req.contato}`} className="contact-link">
                    {req.contato}
                  </a>
                </td>
                <td>
                  <span className={`status ${req.status.toLowerCase()}`}>
                    {req.status}
                  </span>
                </td>
                <td>
                  {req.status === "PENDENTE" ? (
                    <div className="actions">
                      <button
                        className="approve-btn"
                        onClick={() => handleUpdateStatus(req.id, "DEFERIDA")}
                      >
                        Deferir
                      </button>
                      <button
                        className="deny-btn"
                        onClick={() => handleUpdateStatus(req.id, "INDEFERIDA")}
                      >
                        Indeferir
                      </button>
                    </div>
                  ) : (
                    <em>—</em>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <button
            disabled={paginaAtual === 1}
            onClick={() => setPaginaAtual(paginaAtual - 1)}
          >
            ◀
          </button>
          <span>
            Página {paginaAtual} de {totalPaginas}
          </span>
          <button
            disabled={paginaAtual === totalPaginas}
            onClick={() => setPaginaAtual(paginaAtual + 1)}
          >
            ▶
          </button>
        </div>
      </div>
    </div>
  );
}
