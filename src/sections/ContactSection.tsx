import { contactChannels, contactContent, sectionMeta } from "../content/siteContent";

export function ContactSection() {
  return (
    <section className="content-section contact-section" id="contact">
      <div className="container">
        <p className="eyebrow" data-reveal>
          <span className="eyebrow-index">{sectionMeta.contact.index}</span>
          {sectionMeta.contact.eyebrow}
        </p>

        <h2 className="contact-title" data-reveal>
          {contactContent.titleLines.map((line) => (
            <span
              key={line.text}
              className={line.accent ? "hero-line hero-line-accent" : "hero-line"}
            >
              {line.text}
            </span>
          ))}
        </h2>

        <p className="contact-description" data-reveal>
          {contactContent.description}
        </p>

        <div className="contact-grid" data-reveal>
          {contactChannels.map((channel) => (
            <a
              key={channel.label}
              className="glass-card contact-card"
              href={channel.href}
              target={channel.href.startsWith("http") ? "_blank" : undefined}
              rel={channel.href.startsWith("http") ? "noreferrer" : undefined}
            >
              <span className="contact-label">{channel.label}</span>
              <strong>{channel.value}</strong>
              <span className="contact-arrow" aria-hidden="true">
                →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
