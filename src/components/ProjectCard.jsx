import "./ProjectCard.css";

function ProjectCard({
  title,
  description,
  technologies,
  status,
  onDelete,
  githubUrl,
  deployUrl,
  onEdit,
}) {
  return (
    <article className="project-card">
      <span className="project-card__status">{status}</span>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="project-card__technologies">
        {technologies.map((technology) => (
          <span key={technology} className="project-card__technology">
            {technology}
          </span>
        ))}
      </div>
      <div className="project-card__actions">
        {githubUrl && (
          <a
            className="project-card__link"
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        )}

        {deployUrl && (
          <a
            className="project-card__link"
            href={deployUrl}
            target="_blank"
            rel="noreferrer"
          >
            Ver projeto
          </a>
        )}
        <button className="project-card__edit" type="button" onClick={onEdit}>
          Editar
        </button>
        <button
          className="project-card__delete"
          type="button"
          onClick={onDelete}
        >
          Excluir
        </button>
      </div>
    </article>
  );
}

export default ProjectCard;
