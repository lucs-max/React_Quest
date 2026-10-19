import MissionCard from "../components/MissionCard";
import MissionFilter from "../components/MissionFilter";
import MissionForm from "../components/MissionForm";
import MissionSearch from "../components/MissionSearch";

function MissionPage({
  missions,
  sortedMissions,
  onAddMission,
  editingMission,
  onUpdateMission,
  onToggleMission,
  onDeleteMission,
  onEditMission,
  searchTerm,
  onSearchTermChange,
  statusFilter,
  onStatusChange,
  technologyFilter,
  onTechnologyChange,
  difficultyFilter,
  onDifficultyChange,
  sortOrder,
  onSortOrderChange,
}) {
  return (
    <>
      <MissionForm
        onAddMission={onAddMission}
        onUpdateMission={onUpdateMission}
        editingMission={editingMission}
      />

      <section className="missions-section">
        <MissionSearch
          searchTerm={searchTerm}
          setSearchTerm={onSearchTermChange}
        />

        <MissionFilter
          statusFilter={statusFilter}
          onStatusChange={onStatusChange}
          technologyFilter={technologyFilter}
          onTechnologyChange={onTechnologyChange}
          difficultyFilter={difficultyFilter}
          onDifficultyChange={onDifficultyChange}
          sortOrder={sortOrder}
          onSortOrderChange={onSortOrderChange}
        />

        <div className="section-heading">
          <div>
            <p className="section-heading__tag">Central de Missões</p>
            <h2>Próximos Desafios</h2>
          </div>

          <span> {missions.length} missões</span>
        </div>

        <div className="missions-grid">
          {sortedMissions.length === 0 ? (
            <div className="empty-state">
              <h3>Nenhuma missão encontrada</h3>
              <p>Tente alterar sua busca ou seus filtros.</p>
            </div>
          ) : (
            sortedMissions.map((mission) => (
              <MissionCard
                key={mission.id}
                title={mission.title}
                description={mission.description}
                technology={mission.technology}
                difficulty={mission.difficulty}
                xp={mission.xp}
                completed={mission.completed}
                onToggle={() => onToggleMission(mission.id)}
                onDelete={() => onDeleteMission(mission.id)}
                onEdit={() => onEditMission(mission)}
              />
            ))
          )}
        </div>
      </section>
    </>
  );
}

export default MissionPage;