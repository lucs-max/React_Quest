import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import { supabase } from "./services/supabaseClient";
import "./App.css";

import DashboardPage from "./pages/DashboardPage";
import MissionPage from "./pages/MissionPage";
import ProjectPage from "./pages/ProjectPage";
import EvolutionPage from "./pages/EvolutionPage";

import Navigation from "./components/Navigation";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [missions, setMissions] = useState([]);
  const [editingMission, setEditingMission] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todas");
  const [technologyFilter, setTechnologyFilter] = useState("Todas");
  const [difficultyFilter, setDifficultyFilter] = useState("Todas");
  const [sortOrder, setSortOrder] = useState("Maior XP");
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadData() {
      setLoading(true);
      setLoadError("");
      try {
        const [projectsResult, missionsResult] = await Promise.all([
          supabase.from("projects").select("*").order("created_at"),

          supabase.from("missions").select("*").order("created_at"),
        ]);

        if (projectsResult.error) {
          throw projectsResult.error;
        }

        if (missionsResult.error) {
          throw missionsResult.error;
        }

        const formattedProjects = (projectsResult.data || []).map(
          (project) => ({
            id: project.id,
            title: project.title,
            description: project.description,
            technologies: project.technologies || [],
            status: project.status,
            githubUrl: project.github_url || "",
            deployUrl: project.deploy_url || "",
          }),
        );

        const formattedMissions = (missionsResult.data || []).map(
          (mission) => ({
            id: mission.id,
            title: mission.title,
            description: mission.description,
            technology: mission.technology,
            difficulty: mission.difficulty,
            xp: mission.xp,
            completed: mission.completed,
          }),
        );
        if (!active) return;

        setProjects(formattedProjects);
        setMissions(formattedMissions);

        console.log("Projetos:", formattedProjects);

        console.log("Missões:", formattedMissions);
      } catch (error) {
        if (active) {
          setLoadError(
            error instanceof Error
              ? error.message
              : "Erro desconhecido ao carregar os dados.",
          );
          console.error(error);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }
    loadData();

    return () => {
      active = false;
    };
  }, []);

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

  //consulta banco de dados

  async function loadProjects() {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Erro ao carregar projetos:", error.message);
      return;
    }
    console.log("Projetos carregados do Supabase:", data);
  }

  return (
    <main className="app">
      <Header />

      <Navigation />
      <div className="dashboard">
        {loading ? (
          <p role="status"> Carregando sua jornada... </p>
        ) : loadError ? (
          <p role="alert">
            Não foi possível carregar os dados.
            {` ${loadError}`}
          </p>
        ) : (
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
        )}
      </div>

      <Footer />
    </main>
  );
}
export default App;
