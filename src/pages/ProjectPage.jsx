import ProjectCard from "../components/ProjectCard";
import ProjectForm from "../components/ProjectForm";

function ProjectPage({
  projects,
  onAddProject,
  editingProject,
  onUpdateProject,
  onDeleteProject,
  onEditProject,
}) {
  return (
    <section className="projects-section">
      <div className="projects-section__header">
        <div>
          <span className="section-eyebrow">Portfólio</span>
          <h2>Central de Projetos</h2>
          <p className="project-count">
            {projects.length}
            {"  "}
            {projects.length === 1 ? "projeto" : "projetos"}
          </p>
        </div>
      </div>

      <ProjectForm
        onAddProject={onAddProject}
        editingProject={editingProject}
        onUpdateProject={onUpdateProject}
      />

      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.description}
            technologies={project.technologies}
            status={project.status}
            githubUrl={project.githubUrl}
            deployUrl={project.deployUrl}
            onDelete={() => onDeleteProject(project.id)}
            onEdit={() => onEditProject(project)}
          />
        ))}
      </div>
    </section>
  );
}

export default ProjectPage;
