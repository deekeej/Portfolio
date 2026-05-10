import { SectionHeading } from "../components/SectionHeading";
import { projects } from "../content/siteContent";

export function ProjectsSection() {
  return (
    <section className="content-section" id="work">
      <div className="container">
        <SectionHeading
          eyebrow="Selected Work"
          title="Production work across enterprise systems, DevOps automation, and telemedicine."
          description="These highlights reflect real delivery work spanning backend architecture, operational tooling, cloud pipelines, and end-to-end full-stack product development."
        />

        <div className="project-grid">
          {projects.map((project) => (
            <article key={project.title} className="surface-card project-card">
              <div className="project-glow" aria-hidden="true" />
              <p className="project-kicker">Selected project area</p>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <ul className="tag-list">
                {project.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
