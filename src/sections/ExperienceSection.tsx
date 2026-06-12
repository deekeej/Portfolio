import { SectionHeading } from "../components/SectionHeading";
import { aboutCard, experienceGroups, sectionMeta } from "../content/siteContent";

export function ExperienceSection() {
  return (
    <section className="content-section" id="experience">
      <div className="container">
        <SectionHeading
          index={sectionMeta.experience.index}
          eyebrow={sectionMeta.experience.eyebrow}
          title={sectionMeta.experience.title}
          description={sectionMeta.experience.description}
        />

        <div className="experience-layout">
          <aside className="glass-card about-card" data-reveal>
            <img src={aboutCard.portrait} alt={`${aboutCard.name} portrait`} />
            <p className="about-name">{aboutCard.name}</p>
            <p className="about-line">{aboutCard.line}</p>
          </aside>

          <div className="experience-grid">
            {experienceGroups.map((group) => (
              <article key={group.title} className="experience-group" data-reveal>
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
      </div>
    </section>
  );
}
