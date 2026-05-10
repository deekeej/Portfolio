import { SectionHeading } from "../components/SectionHeading";
import { capabilities } from "../content/siteContent";

export function ServicesSection() {
  return (
    <section className="content-section" id="capabilities">
      <div className="container">
        <SectionHeading
          eyebrow="Capabilities"
          title="The site now speaks in focused strengths instead of a long generic services list."
          description="This section is designed to stay concise and modern, giving the redesign a sharper product-facing tone."
        />

        <div className="capability-grid">
          {capabilities.map((capability) => (
            <article key={capability.title} className="surface-card capability-card">
              <h3>{capability.title}</h3>
              <p>{capability.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
