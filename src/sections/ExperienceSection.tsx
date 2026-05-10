import { SectionHeading } from "../components/SectionHeading";
import { experienceGroups } from "../content/siteContent";

export function ExperienceSection() {
  return (
    <section className="content-section" id="experience">
      <div className="container">
        <SectionHeading
          eyebrow="Experience"
          title="Built through real delivery across software, infrastructure, and operations."
          description="My experience combines application development with deployment pipelines, automation playbooks, monitoring, cloud services, and production-focused engineering practice."
        />

        <div className="experience-grid">
          {experienceGroups.map((group) => (
            <article key={group.title} className="surface-card experience-card">
              <h3>{group.title}</h3>
              <ul className="pill-list">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
