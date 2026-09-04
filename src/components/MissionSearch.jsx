import "./MissionSearch.css";

function MissionSearch({ searchTerm, setSearchTerm }) {
    return(
        <section className="mission-search">
            <label htmlFor="mission-search">Pesquisar Missão</label>
            <input 
                type="text" 
                id="mission-search" 
                placeholder="Pesquisar missão..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

{searchTerm && (
            

            <button 
            type="button"
             className="mission-search__clear"
             onClick={() => setSearchTerm("")}>
                Limpar

            </button>
)}
        </section>
    )
}



export default MissionSearch;