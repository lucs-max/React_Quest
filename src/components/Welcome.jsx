import './Welcome.css';
function Welcome() {
  return (
    <section className="welcome">
      <p className="welcome__tag">Sua jornada começa agora</p>

      <h1>React Quest</h1>

      <h2>Central de Missões e Evolução Dev</h2>

      <p>
        Um espaço para registrar projetos, concluir desafios,
        acompanhar conhecimentos e evoluir como desenvolvedor.
      </p>

      <button>Iniciar jornada</button>
    </section>
  );
}

export default Welcome;
