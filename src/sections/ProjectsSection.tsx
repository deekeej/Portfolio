import { SectionHeading } from "../components/SectionHeading";
import { projects, sectionMeta } from "../content/siteContent";

export function ProjectsSection() {
  return (
    <section className="content-section" id="work">
      <div className="container">
        <SectionHeading
          index={sectionMeta.work.index}
          eyebrow={sectionMeta.work.eyebrow}
          title={sectionMeta.work.title}
          description={sectionMeta.work.description}
        />

        <div className="project-list">
          {projects.map((project, index) => (
            <article key={project.title} className="project-row" data-reveal>
              <span className="project-index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="project-main">
                <p className="project-kicker">{project.kicker}</p>
                <h3>{project.title}</h3>
                <p className="project-summary">{project.summary}</p>
              </div>

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
