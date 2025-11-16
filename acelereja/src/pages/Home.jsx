// Home.jsx
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: "👩‍🏫",
      title: "Governo",
      text: "Gerencie instituições, vagas e matrículas de forma transparente e eficiente.",
    },
    {
      icon: "🏫",
      title: "Instituições",
      text: "Divulgue cursos e vagas disponíveis, receba inscrições e acompanhe o processo em tempo real.",
    },
    {
      icon: "🎓",
      title: "Estudantes",
      text: "Encontre vagas perto de você e inscreva-se com apenas alguns cliques.",
    },
  ];

  return (
    <main className="home-container">
      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <h1>
            Dê um <span>novo passo</span> na sua educação
          </h1>
          <p>
            O AcelerEJA conecta você às melhores oportunidades para concluir
            seus estudos e transformar o futuro.
          </p>
          <button className="cta-btn" onClick={() => navigate("/register")}>
            Quero voltar a estudar
          </button>
        </div>
      </section>

      {/* SOBRE */}
      <section className="about">
        <div className="about-content">
          <h2>Como o AcelerEJA te ajuda</h2>
          <p>
            O AcelerEJA aproxima governos, instituições e estudantes em uma
            única plataforma, facilitando o acesso à Educação de Jovens e
            Adultos. Tudo de forma digital, gratuita e acessível.
          </p>
        </div>
      </section>

      {/* IMPORTÂNCIA */}
      <section className="importance">
        <div className="importance-content">
          <div className="text">
            <h2>Por que o EJA é tão importante?</h2>
            <p>
              O EJA dá uma nova chance a quem precisou interromper os estudos,
              promovendo autonomia e novas oportunidades de trabalho e renda.
            </p>
            <p className="highlight">
              O AcelerEJA nasceu para tornar esse caminho mais simples e
              acessível — porque aprender é poder recomeçar.
            </p>
          </div>
          <div className="image">
            <img
              src="/img/study_together.svg"
              alt="Estudantes felizes estudando"
            />
          </div>
        </div>
      </section>

      {/* FUNCIONALIDADES */}
      <section className="features">
        <h2>O que você pode fazer aqui</h2>
        <div className="grid">
          {features.map(({ icon, title, text }) => (
            <div key={title} className="card">
              <h3>
                {icon} {title}
              </h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="final-cta">
        <h2>Seu futuro começa agora. Vamos juntos?</h2>
        <button className="cta-btn large" onClick={() => navigate("/register")}>
          Acelerar minha jornada
        </button>
      </section>
    </main>
  );
}
