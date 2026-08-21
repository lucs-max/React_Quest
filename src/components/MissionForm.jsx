import {useState} from "react";
import './MissionForm.css';

function MissionForm({ onAddMission }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [technology, setTechnology] = useState("React");
    const [difficulty, setDifficulty] = useState("Fácil");
    const [xp, setXp] = useState(50);


    function handleSubmit(event) {
        event.preventDefault();

        if(!title.trim() || !description.trim()){
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        const newMission = {
            id: Date.now(),
            title,
            description,
            technology,
            difficulty,
            xp,
            completed: false,
        }

        onAddMission(newMission);
        
        setTitle("");
        setDescription("");
        setTechnology("React");
        setDifficulty("Fácil");
        setXp(50);
    }

    return (
        <section className="mission-form-section">
            <div className="mission-form-heading">
                <p>Nova Missão</p>
                <h2>Crie a sua propria missao</h2>
            </div>
            <form className="mission-form" onSubmit={handleSubmit}>
                <div className="mission-form__group">
                    <label htmlFor="title">Título</label> 
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        placeholder="Digite o título da missão"
                    />
                </div>

                <div className="mission-form__group">
                    <label htmlFor="description">Descrição</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        placeholder="Descreva a missão"
                    />
                </div>

                <div className="mission-form__group">
                    <label htmlFor="technology">Tecnologia</label>
                    <select
                        id="technology"
                        value={technology}
                        onChange={(event) => setTechnology(event.target.value)}
                    >
                        <option value="React">React</option>
                        <option value="HTML">HTML</option>
                        <option value="CSS">CSS</option>
                        <option value="Git">Git</option>
                        <option value="Debug">Debug</option>
                        <option value="JavaScript">JavaScript</option>
                        <option value="IA">IA</option>
                        <option value="Python">Python</option>
                    </select>
                </div>

                <div className="mission-form__group">
                    <label htmlFor="difficulty">Dificuldade</label>
                    <select
                        id="difficulty"
                        value={difficulty}
                        onChange={(event) => setDifficulty(event.target.value)}
                    >
                        <option value="Fácil">Fácil</option>
                        <option value="Médio">Médio</option>
                        <option value="Difícil">Difícil</option>
                    </select>
                </div>

                <div className="mission-form__group">
                    <label htmlFor="xp">XP</label>
                    <input
                        type="number"
                        id="xp"
                        value={xp}
                        onChange={(event) => setXp(Number(event.target.value))}
                        min={10}
                        step={10}
                    />
                </div>

                <button type="submit" className="mission-form__button">
                    Adicionar missão
                </button>
            </form>
        </section>
    )

}
export default MissionForm;