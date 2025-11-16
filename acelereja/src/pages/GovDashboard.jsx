// GovDashboard.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/GovDashboard.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function GovDashboard() {
  const { user } = useAuth();
  const [graficoCidades, setGraficoCidades] = useState([]);
  const [instituicoes, setInstituicoes] = useState([]);
  const [metricas, setMetricas] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        if (!user?.id) return;
        const response = await fetch(
          `http://localhost:3000/api/governo/${user.governoId}/dashboard`
        );
        const data = await response.json();

        // gráfico e tabela separados
        setInstituicoes(data.instituicoes || []);
        setGraficoCidades(data.graficoCidades || []);

        setMetricas({
          totalInstituicoes: data.totalInstituicoes,
          totalMatriculas: data.totalMatriculas,
          pendentes: data.pendentes,
          deferidas: data.deferidas,
          indeferidas: data.indeferidas,
        });
      } catch (error) {
        console.error("Erro ao carregar dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [user]);

  if (loading) {
    return (
      <div className="gov-dashboard-container">
        <p>Carregando dados do painel...</p>
      </div>
    );
  }

  if (!metricas) {
    return (
      <div className="gov-dashboard-container">
        <p>Não foi possível carregar os dados do governo.</p>
      </div>
    );
  }

  return (
    <div className="gov-dashboard-container">
      <h2>Painel do Governo</h2>
      <p className="subtitle">
        Acompanhe suas instituições cadastradas e indicadores do programa EJA.
      </p>

      {/* 📊 Cards de métricas */}
      <div className="metrics-grid">
        <div className="metric-card">
          <h3>{metricas.totalInstituicoes}</h3>
          <p>Instituições cadastradas</p>
        </div>
        <div className="metric-card">
          <h3>{metricas.totalMatriculas}</h3>
          <p>Total de matrículas</p>
        </div>
        <div className="metric-card warning">
          <h3>{metricas.pendentes}</h3>
          <p>Solicitações pendentes</p>
        </div>
        <div className="metric-card success">
          <h3>{metricas.deferidas}</h3>
          <p>Solicitações deferidas</p>
        </div>
        <div className="metric-card danger">
          <h3>{metricas.indeferidas}</h3>
          <p>Solicitações indeferidas</p>
        </div>
      </div>

      {/* 📈 Gráfico */}
      <div className="chart-section">
        <h3>Matrículas por cidade</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={graficoCidades}
            margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="cidade" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="matriculas" fill="#2563eb" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 🏫 Lista de instituições */}
      <div className="instituicoes-section">
        <h3>Instituições cadastradas</h3>
        <table className="instituicoes-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Cidade</th>
              <th>Estado</th>
              <th>Matrículas</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {instituicoes.map((inst) => (
              <tr key={inst.id}>
                <td>{inst.nome}</td>
                <td>{inst.cidade}</td>
                <td>{inst.estado}</td>
                <td>{inst.matriculas}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
