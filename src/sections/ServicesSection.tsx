import { SectionHeading } from "../components/SectionHeading";
import { capabilities, sectionMeta } from "../content/siteContent";

export function ServicesSection() {
  return (
    <section className="content-section" id="capabilities">
      <div className="container">
        <SectionHeading
          index={sectionMeta.capabilities.index}
          eyebrow={sectionMeta.capabilities.eyebrow}
          title={sectionMeta.capabilities.title}
          description={sectionMeta.capabilities.description}
        />

        <div className="capability-grid">
          {capabilities.map((capability, index) => (
            <article key={capability.title} className="glass-card capability-card" data-reveal>
              <span className="card-index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{capability.title}</h3>
              <p>{capability.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
