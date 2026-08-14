import "./App.css";
import Header from "./components/Header";
import Welcome from "./components/Welcome";
import Footer from "./components/Footer";
import ProfileCard from "./components/ProfileCard";
import SummaryCard from "./components/SummaryCard";

const summaryData = [
  {
    id: 1,
    title: "Missões",
    value: 5,
    description: "Desafios disponíveis",
  },
  {
    id: 2,
    title: "Projetos",
    value: 3,
    description: "Projetos cadastrados",
  },
  {
    id: 3,
    title: "Tecnologias",
    value: 6,
    description: "Tecnologias praticadas",
  },
  {
    id: 4,
    title: "XP",
    value: 150,
    description: "Experiência acumulada",
  },
  {
    id: 5,
    title: "Conquistas",
    value: 2,
    description: "Conquistas desbloqueadas",
  },

];


function App() {
  return (
    <main className="app">
      <Header />
      <div className="dashboard">
        <ProfileCard
          name="Andrea"
          codename="CodeMaster"
          favoriteArea="Desenvolvimento Web"
          level="Aprendiz React"
        />
        <section className="summary-section">
          <h2>Resumo da jornada</h2>
  
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
  
        <Welcome />
      </div>
      <Footer />
    </main>
  );
}

export default App;
