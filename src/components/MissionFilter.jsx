import './MissionFilter.css';

function MissionFilter({ statusFilter, onStatusChange, technologyFilter, onTechnologyChange, difficultyFilter, onDifficultyChange, sortOrder, onSortOrderChange }) {

    return (
       <section className="mission-filters">
            <div className="mission-filters__group">
                <label htmlFor="status-filter">Status</label>
                <select 
                id="status-filter"
                value={statusFilter}
                onChange={(e) => onStatusChange(e.target.value)}
                >
                    <option value="Todas">Todos</option>
                    <option value="Concluídas">Concluídas</option>
                    <option value="Pendentes">Pendentes</option>
                </select>
           
            {/* Technology */}
                <label htmlFor="technology-filter">Tecnologia</label>
                <select 
                id="technology-filter"
                value={technologyFilter}
                onChange={(e) => onTechnologyChange(e.target.value)}
                >
                    <option value="Todas">Todas</option>
                    <option value="React">React</option>
                    <option value="Node.js">Node.js</option>
                    <option value="Python">Python</option>
                    <option value="Java">Java</option>
                    <option value="C#">C#</option>
                    <option value="Java">Java</option>
                    <option value="HTML">HTML</option>
                    <option value="CSS">CSS</option>
                    <option value="Git">Git</option>
                    <option value="IA">IA</option>
                    <option value="Debug">Debug</option>
                </select>

            {/* Difficulty */}
                <label htmlFor="difficulty-filter">Dificuldade</label>
                <select 
                id="difficulty-filter"
                value={difficultyFilter}
                onChange={(e) => onDifficultyChange(e.target.value)}
                >
                    <option value="Todas">Todas</option>
                    <option value="Fácil">Fácil</option>
                    <option value="Média">Média</option>
                    <option value="Difícil">Difícil</option>
                </select>
                </div>
            <div className="mission-filters__group">
        {/* XP */}
        <label htmlFor="sort-order">Ordenar</label>

        <select
          id="sort-order"
          value={sortOrder}
          onChange={(event) => onSortOrderChange(event.target.value)}
        >
          <option value="Maior XP">Maior XP</option>

          <option value="Menor XP">Menor XP</option>
        </select>
      </div>
       </section> 
       
    );
}

export default MissionFilter;