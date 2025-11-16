import "../styles/PerguntasFrequentes.css";

export default function PerguntasFrequentes() {
  const perguntas = [
    {
      pergunta: "O que é o EJA?",
      resposta:
        "O EJA (Educação de Jovens e Adultos) é uma modalidade de ensino destinada a pessoas que não concluíram o ensino fundamental ou médio na idade adequada.",
    },
    {
      pergunta: "Quem pode se matricular no EJA?",
      resposta:
        "Podem se matricular jovens a partir de 15 anos para o Ensino Fundamental e adultos a partir de 18 anos para o Ensino Médio.",
    },
    {
      pergunta: "Como saber as datas de matrícula?",
      resposta:
        "As datas de matrícula variam conforme o estado. O AcelerEJA exibe o calendário atualizado conforme as informações divulgadas pelas secretarias estaduais de educação.",
    },
    {
      pergunta: "Quais documentos são necessários para matrícula?",
      resposta:
        "Geralmente são solicitados: RG, CPF, comprovante de residência, histórico escolar (ou declaração provisória) e duas fotos 3x4.",
    },
    {
      pergunta: "Como entrar em contato com a Secretaria de Educação?",
      resposta:
        "Na página da sua instituição, você encontrará os contatos diretos da secretaria estadual responsável pela sua região. O portal AcelerEJA facilita esse acesso de forma rápida e segura.",
    },
    {
      pergunta: "O EJA é gratuito?",
      resposta:
        "Sim, o EJA é oferecido gratuitamente pelas redes públicas estaduais e municipais.",
    },
  ];

  return (
    <section className="faq-container">
      <h1>Perguntas Frequentes</h1>
      <p className="faq-intro">
        Tire suas dúvidas sobre o EJA e o funcionamento do AcelerEJA.
      </p>

      <div className="faq-list">
        {perguntas.map((item, index) => (
          <details key={index} className="faq-item">
            <summary>{item.pergunta}</summary>
            <p>{item.resposta}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
