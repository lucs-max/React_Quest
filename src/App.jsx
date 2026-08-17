import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Welcome from "./components/Welcome";
import Footer from "./components/Footer";
import ProfileCard from "./components/ProfileCard";
import SummaryCard from "./components/SummaryCard";
import MissionCard from "./components/MissionCard";

const initialMissions = [
  {
    id: 1,
    title: "Criar componente de perfil",
    description: "Monte um card com nome, codinome e área favorita.",
    technology: "React",
    difficulty: "Fácil",
    xp: 50,
    completed: true,
  },
  {
    id: 2,
    title: "Reutilizar um componente",
    description: "Use o mesmo componente para exibir dados diferentes.",
    technology: "React",
    difficulty: "Fácil",
    xp: 50,
    completed: true,
  },
  {
    id: 3,
    title: "Criar a Central de Missões",
    description: "Exiba uma lista de missões utilizando componentes.",
    technology: "React",
    difficulty: "Média",
    xp: 100,
    completed: false,
  },
  {
    id: 4,
    title: "Investigar um erro",
    description: "Encontre e corrija um problema de props ou estado.",
    technology: "Debug",
    difficulty: "Média",
    xp: 80,
    completed: true,
  },
];

function App() {
  const [missions, setMissions] = useState(initialMissions);

  function toggleMission(missionId) {
    const updatedMissions = missions.map((mission) => {
      if (mission.id === missionId) {
        return {
          ...mission,
          completed: !mission.completed,
        };
      }
      return mission;
    });
    setMissions(updatedMissions);
  }

  const completedMissions = missions.filter((mission) => mission.completed);

  const completedMissionsCount = completedMissions.length;

  const earnedXp = completedMissions.reduce(
    (total, mission) => total + mission.xp,
    0,
  );

  const summaryData = [
    {
      id: 1,
      title: "Missões",
      value: completedMissionsCount,
      description: `${missions.length} Missões Disponíveis`,
    },
    {
      id: 2,
      title: "Projetos",
      value: 3,
      description: "Projetos Cadastrados",
    },
    {
      id: 3,
      title: "Tecnologias",
      value: 7,
      description: "Tecnologias Praticadas",
    },
    {
      id: 4,
      title: "Objetivos",
      value: 6,
      description: "Objetivos Estabelecidos",
    },
    {
      id: 5,
      title: "XP",
      value: earnedXp,
      description: "Experiência Acumulada",
    },
  ];

  return (
    <main className="app">
      <Header />
      <div className="dashboard">
        <ProfileCard
          name="Andréa"
          codename="CodeMaster"
          favoriteArea="Desenvolvimento Web"
          level="Aprendiz React"
        />

        <section className="summary-section">
          <h2>Resumo da Jornada</h2>
          <div className="summary-grid">
            {summaryData.map((item) => (
              <SummaryCard
                key={item.id}
                title={item.title}
                value={item.value}
                description={item.description}
              />
            ))}
          </div>
        </section>

        <section className="missions-section">
          <div className="section-heading">
            <div>
              <p className="section-heading__tag">Central de Missões</p>

              <h2>Próximos Desafios</h2>
            </div>

            <span> {missions.length} missões</span>
          </div>

          <div className="missions-grid">
            {missions.map((mission) => (
              <MissionCard
                key={mission.id}
                title={mission.title}
                description={mission.description}
                technology={mission.technology}
                difficulty={mission.difficulty}
                xp={mission.xp}
                completed={mission.completed}
                onToggle={() => toggleMission(mission.id)}
              />
            ))}
          </div>
        </section>

        <Welcome />
      </div>
      <Footer />
    </main>
  );
}

export default App;