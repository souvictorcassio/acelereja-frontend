import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/Profile.css";

export default function Profile() {
  const { user } = useAuth(); // usuário logado
  const [dados, setDados] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🔹 Carregar dados do backend
  useEffect(() => {
    if (!user || user.tipo !== "POPULACAO") return;

    async function fetchPerfil() {
      try {
        const res = await fetch(
          `http://localhost:3000/api/populacao/${user.populacaoId || user.id}`
        );
        if (!res.ok) throw new Error("Erro ao buscar dados");
        const data = await res.json();
        setDados(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchPerfil();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDados((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/populacao/${dados.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            telefone: dados.telefone,
            estado: dados.estado,
            cidade: dados.cidade,
            bairro: dados.bairro,
            endereco: dados.endereco,
            cep: dados.cep,
          }),
        }
      );

      const result = await res.json();
      if (!res.ok) throw new Error(result.erro || "Erro ao atualizar dados");

      alert("✅ Dados atualizados com sucesso!");
      setIsEditing(false);
    } catch (error) {
      alert("❌ " + error.message);
    }
  };

  if (loading) return <p>Carregando dados...</p>;
  if (!dados) return <p>Nenhum dado encontrado.</p>;

  return (
    <div className="profile-container">
      <h2>Meu Perfil</h2>
      <p className="subtitle">
        Consulte e atualize suas informações pessoais e acompanhe sua matrícula.
      </p>

      {/* 🔹 Dados pessoais */}
      <div className="profile-card">
        <h3>Dados Cadastrais</h3>
        <div className="profile-info">
          <label>
            Nome completo:
            <input type="text" value={dados.nome} disabled />
          </label>

          <label>
            E-mail:
            <input type="email" value={user?.email || ""} disabled />
          </label>

          <label>
            Telefone:
            <input
              type="text"
              name="telefone"
              value={dados.telefone || ""}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </label>

          <label>
            Estado:
            <input
              type="text"
              name="estado"
              value={dados.estado || ""}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </label>

          <label>
            Cidade:
            <input
              type="text"
              name="cidade"
              value={dados.cidade || ""}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </label>

          <label>
            Bairro:
            <input
              type="text"
              name="bairro"
              value={dados.bairro || ""}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </label>

          <label>
            Endereço:
            <input
              type="text"
              name="endereco"
              value={dados.endereco || ""}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </label>

          <label>
            CEP:
            <input
              type="text"
              name="cep"
              value={dados.cep || ""}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </label>
        </div>

        <div className="profile-actions">
          {isEditing ? (
            <>
              <button className="btn-save" onClick={handleSave}>
                Salvar
              </button>
              <button
                className="btn-cancel"
                onClick={() => setIsEditing(false)}
              >
                Cancelar
              </button>
            </>
          ) : (
            <button className="btn-edit" onClick={() => setIsEditing(true)}>
              Editar Dados
            </button>
          )}
        </div>
      </div>

      {/* 🔹 Matrículas */}
      <div className="enrollment-card">
        <h3>Minhas Matrículas</h3>
        {dados.matriculas && dados.matriculas.length > 0 ? (
          dados.matriculas.map((m) => (
            <div key={m.id} className="enrollment-info">
              <p>
                <strong>Instituição:</strong> {m.instituicao.nome}
              </p>
              <p>
                <strong>Cidade:</strong> {m.instituicao.cidade}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span className={`status ${m.status.toLowerCase()}`}>
                  {m.status}
                </span>
              </p>
            </div>
          ))
        ) : (
          <p className="no-enrollment">Nenhuma matrícula encontrada.</p>
        )}
      </div>
    </div>
  );
}
