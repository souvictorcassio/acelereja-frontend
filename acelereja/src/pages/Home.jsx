import "../styles/Home.css";
import { useNavigate } from "react-router-dom";
import studyImg from "../assets/study_together2.png";

export default function Home() {
  const navigate = useNavigate();

  const sections = [
    { id: "hero", label: "🚀" },
    { id: "how-it-works", label: "1" },
    { id: "importance", label: "2" },
    { id: "benefits", label: "3" },
    { id: "stats", label: "4" },
    { id: "final-cta", label: "✓" },
  ];

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="home-container">
      {/* NAVEGAÇÃO LATERAL */}
      <div className="side-nav">
        {sections.map((sec) => (
          <button
            key={sec.id}
            className="side-nav-btn"
            onClick={() => scrollToSection(sec.id)}
          >
            {sec.label}
          </button>
        ))}
      </div>

      {/* HERO */}
      <section id="hero" className="hero">
        <div className="hero-content">
          <h1>
            Conclua seus estudos com o <span>EJA</span>
          </h1>
          <p className="hero-sub">
            Encontre escolas, consulte vagas e faça sua matrícula online.
          </p>

          <button className="cta-btn" onClick={() => navigate("/register")}>
            Quero me matricular
          </button>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section id="how-it-works" className="how-it-works">
        <h2>Como funciona?</h2>
        <div className="steps">
          <div className="step">
            <span className="step-number">1</span>
            <h3>Encontre uma Escola</h3>
            <p>Veja unidades próximas com vagas abertas no EJA.</p>
          </div>

          <div className="step">
            <span className="step-number">2</span>
            <h3>Consulte as Vagas</h3>
            <p>Acompanhe horários, modalidades e disponibilidade.</p>
          </div>

          <div className="step">
            <span className="step-number">3</span>
            <h3>Faça sua Matrícula</h3>
            <p>Preencha seus dados e garanta sua vaga em poucos minutos.</p>
          </div>
        </div>
      </section>

      {/* IMPORTÂNCIA */}
      <section id="importance" className="importance">
        <div className="importance-content">
          <div className="text">
            <h2>Por que voltar a estudar?</h2>
            <p>
              O EJA é a porta para novas oportunidades de trabalho, renda e
              autonomia. Com o AcelerEJA, você encontra vagas facilmente.
            </p>
            <p className="highlight">
              Educação muda vidas — e seu recomeço pode começar hoje.
            </p>
          </div>
          <div className="image">
            <img src={studyImg} alt="Estudantes felizes estudando" />
          </div>
        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section id="benefits" className="benefits">
        <h2>Por que usar o AcelerEJA?</h2>

        <div className="benefits-grid">
          <div className="benefit-card">📍 Escolas perto de você</div>
          <div className="benefit-card">⚡ Matrícula rápida e digital</div>
          <div className="benefit-card">📚 Modalidades flexíveis</div>
          <div className="benefit-card">🔍 Acompanhamento fácil</div>
        </div>
      </section>

      {/* NÚMEROS */}
      <section id="stats" className="stats">
        <h2>O impacto do EJA</h2>
        <div className="stats-grid">
          <div className="stat">
            <h3>+3 Milhões</h3>
            <p>de brasileiros buscam concluir os estudos</p>
          </div>

          <div className="stat">
            <h3>+900 Mil</h3>
            <p>matrículas no EJA por ano</p>
          </div>

          <div className="stat">
            <h3>100% Gratuito</h3>
            <p>todo o processo através do AcelerEJA</p>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section id="final-cta" className="final-cta">
        <h2>Vamos transformar seu futuro?</h2>
        <button className="cta-btn large" onClick={() => navigate("/login")}>
          Começar agora
        </button>
      </section>
    </main>
  );
}
