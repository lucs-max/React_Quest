import SkillCard from "../components/SkillCard";

function EvolutionPage({ skills, hasSkillAchievement }) {
  return (
    <section className="skills-section">
      <div className="skills-section__header">
        <span className="section-eyebrow">Evolução Dev</span>

        {hasSkillAchievement && (
          <div className="achievement">
            <span>🏆</span>

            <div>
              <strong>Especialista Iniciante</strong>
              <p>Você alcançou 100 XP em uma tecnologia.</p>
            </div>
          </div>
        )}

        <h2>Régua de Evolução</h2>
        <p>Veja como seus projetos estão desenvolvendo suas habilidades.</p>
      </div>

      <div className="skills-grid">
        {skills.map((skill) => (
          <SkillCard
            key={skill.tech}
            technology={skill.tech}
            xp={skill.xp}
          />
        ))}
      </div>
    </section>
  );
}

export default EvolutionPage;