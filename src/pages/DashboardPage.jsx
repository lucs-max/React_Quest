import Welcome from "../components/Welcome";
import ProfileCard from "../components/ProfileCard";
import SummaryCard from "../components/SummaryCard";

function DashboardPage({ summaryData }) {
  return (
    <>
      <Welcome />
      <ProfileCard
        name="Lucca"
        codename="CodeMaster"
        favoriteArea="Game Development"
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
    </>
  );
}

export default DashboardPage;