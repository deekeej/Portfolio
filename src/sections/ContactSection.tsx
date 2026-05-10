import { contactChannels } from "../content/siteContent";
import { SectionHeading } from "../components/SectionHeading";

export function ContactSection() {
  return (
    <section className="content-section" id="contact">
      <div className="container">
        <SectionHeading
          eyebrow="Contact"
          title="Want to review the direction together?"
          description="The next step is to iterate on the visual language, test the local build, and align the final content before deployment."
        />

        <div className="contact-grid">
          {contactChannels.map((channel) => (
            <a
              key={channel.label}
              className="contact-card"
              href={channel.href}
              target={channel.href.startsWith("http") ? "_blank" : undefined}
              rel={channel.href.startsWith("http") ? "noreferrer" : undefined}
            >
              <span className="contact-label">{channel.label}</span>
              <strong>{channel.value}</strong>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
