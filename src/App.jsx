import { useState } from "react";
import {Routes, Route} from "react-router";
import "./App.css";

import DashboardPage from "./pages/DashboardPage";
import MissionPage from "./pages/MissionPage";
import ProjectPage from "./pages/ProjectPage";
import EvolutionPage from "./pages/EvolutionPage";

import Navigation from "./components/Navigation";
import Header from "./components/Header";
import Footer from "./components/Footer";
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

const initialProjects = [
  {
    id: 1,
    title: "Desenho com Gestos",
    description:
      "Aplicação que permite desenhar utilizando movimentos das mãos.",
    technologies: ["Python", "OpenCV", "MediaPipe"],
    status: "Concluído",
    githubUrl: "https://github.com/seu-usuario/desenho-com-gestos",
    deployUrl: "https://react-quest-three.vercel.app/",
  },
  {
    id: 2,
    title: "Detector de Invasores",
    description: "Jogo desenvolvido em Python com detecção e interação.",
    technologies: ["Python", "Pygame"],
    status: "Concluído",
    githubUrl: "",
    deployUrl: "https://react-quest-three.vercel.app/",
  },
  {
    id: 3,
    title: "Loja Virtual com IA",
    description:
      "Loja virtual que utiliza inteligência artificial para auxiliar o usuário.",
    technologies: ["Python", "Flask", "HTML", "CSS"],
    status: "Concluído",
    githubUrl: "",
    deployUrl: "https://react-quest-three.vercel.app/",
  },
  {
    id: 4,
    title: "React Quest",
    description: "Plataforma de aprendizado em React para auxiliar o usuário.",
    technologies: ["React", "JavaScript", "HTML", "CSS", "Vite"],
    status: "Em andamento",
    githubUrl: "https://github.com/lucs-max/React_Quest.git",
    deployUrl: "https://react-quest-three.vercel.app/",
  },
];

function App() {
  const [missions, setMissions] = useState(initialMissions);
  const [editingMission, setEditingMission] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todas");
  const [technologyFilter, setTechnologyFilter] = useState("Todas");
  const [difficultyFilter, setDifficultyFilter] = useState("Todas");
  const [sortOrder, setSortOrder] = useState("Maior XP");
  const [projects, setProjects] = useState(initialProjects);
  const [editingProject, setEditingProject] = useState(null);

  console.log(statusFilter);
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

  function addMission(newMission) {
    setMissions([...missions, newMission]);
  }

  function deleteMission(missionId) {
    const updatedMissions = missions.filter(
      (mission) => mission.id !== missionId,
    );
    setMissions(updatedMissions);
  }
  function updateMission(updatedMission) {
    const updatedMissions = missions.map((mission) =>
      mission.id === updatedMission.id ? updatedMission : mission,
    );
    setMissions(updatedMissions);
    setEditingMission(null);
  }
  function addProject(newProject) {
    setProjects([...projects, newProject]);
  }
  function updateProject(updatedProject) {
    const updatedProjects = projects.map((project) =>
      project.id === updatedProject.id ? updatedProject : project,
    );
    setProjects(updatedProjects);
    setEditingProject(null);
  }
  function deleteProject(projectId) {
    const showDelete = window.confirm(
      "Tem certeza que deseja excluir este projeto?",
    );
    if (!showDelete) {
      return;
    }

    const updatedProjects = projects.filter(
      (project) => project.id !== projectId,
    );
    setProjects(updatedProjects);
  }

  const completedMissions = missions.filter((mission) => mission.completed);

  const completedMissionsCount = completedMissions.length;

  const earnedXp = completedMissions.reduce(
    (total, mission) => total + mission.xp,
    0,
  );

  const usedTechnologiesCount = new Set(
    projects.flatMap((project) => project.technologies).filter(Boolean),
  ).size;

  const filteredMissions = missions.filter(
    // (mission) => mission.title.toLowerCase().includes(searchTerm.toLowerCase())
    (mission) => {
      const matchesSearchTerm = mission.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "Todas" ||
        (statusFilter === "Concluídas" && mission.completed) ||
        (statusFilter === "Pendentes" && !mission.completed);
      const matchesTechnology =
        technologyFilter === "Todas" || mission.technology === technologyFilter;
      const matchesDifficulty =
        difficultyFilter === "Todas" || mission.difficulty === difficultyFilter;

      return (
        matchesSearchTerm &&
        matchesStatus &&
        matchesTechnology &&
        matchesDifficulty
      );
    },
  );

  const sortedMissions = [...filteredMissions].sort((a, b) => {
    if (sortOrder === "Menor XP") {
      return a.xp - b.xp; //menor para o maior
    }

    return b.xp - a.xp; //maior para o menor
  });

  const completedProjects = projects.filter(
    (project) => project.status === "Concluído",
  );

  const technologyXP = {};
  completedProjects.forEach((project) => {
    project.technologies.forEach((technology) => {
      technologyXP[technology] = (technologyXP[technology] || 0) + 50;
    });
  });

  const skills = Object.entries(technologyXP).map(([tech, xp]) => ({
    tech,
    xp,
  }));

  const hasSkillAchievement = skills.some((skill) => skill.xp >= 100);

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
      value: projects.length,
      description: "Projetos Cadastrados",
    },
    {
      id: 3,
      title: "Tecnologias",
      value: usedTechnologiesCount,
      description: "Tecnologias Diferentes Utilizadas",
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
    <Navigation />
    <div className="dashboard">
      <Routes>
        <Route
          path="/"
          element={<DashboardPage summaryData={summaryData} />}
        />

        <Route
          path="/missions"
          element={
            <MissionPage
              missions={missions}
              sortedMissions={sortedMissions}
              onAddMission={addMission}
              editingMission={editingMission}
              onUpdateMission={updateMission}
              onToggleMission={toggleMission}
              onDeleteMission={deleteMission}
              onEditMission={setEditingMission}
              searchTerm={searchTerm}
              onSearchTermChange={setSearchTerm}
              statusFilter={statusFilter}
              onStatusChange={setStatusFilter}
              technologyFilter={technologyFilter}
              onTechnologyChange={setTechnologyFilter}
              difficultyFilter={difficultyFilter}
              onDifficultyChange={setDifficultyFilter}
              sortOrder={sortOrder}
              onSortOrderChange={setSortOrder}
            />
          }
        />

        <Route
          path="/projects"
          element={
            <ProjectPage
              projects={projects}
              onAddProject={addProject}
              editingProject={editingProject}
              onUpdateProject={updateProject}
              onDeleteProject={deleteProject}
              onEditProject={setEditingProject}
            />
          }
        />

        <Route
          path="/evolution"
          element={
            <EvolutionPage
              skills={skills}
              hasSkillAchievement={hasSkillAchievement}
            />
          }
        />
      </Routes>
    </div>

    <Footer />
  </main>
  );
}
export default App;
