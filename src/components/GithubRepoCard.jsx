import "./GitHubRepoCard.css";

function GitHubRepoCard({ repository }) {
  return (
    <article className="github-repo-card">
      <h3>{repository.name}</h3>

      <p>{repository.description || "Sem descrição disponível."}</p>

      <div className="github-repo-card__details">
        <span>Linguagem: {repository.language || "Não informada"}</span>

        <span>⭐ {repository.stargazers_count}</span>
      </div>
      <a href={repository.html_url} target="_blank" rel="noopener noreferrer">
        Ver no GitHub
      </a>
    </article>
  );
}

export default GitHubRepoCard;