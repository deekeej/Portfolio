import type { ReactNode } from "react";
import { heroContent } from "../content/siteContent";

type HeroSectionProps = {
  scene: ReactNode;
};

export function HeroSection({ scene }: HeroSectionProps) {
  return (
    <section className="hero-section" id="top">
      <div className="container hero-layout">
        <div className="hero-copy">
          <p className="hero-eyebrow">{heroContent.eyebrow}</p>
          <h1>{heroContent.title}</h1>
          <p className="hero-description">{heroContent.description}</p>

          <div className="hero-actions">
            <a className="btn btn-primary" href={heroContent.primaryCta.href}>
              {heroContent.primaryCta.label}
            </a>
            <a className="btn btn-secondary" href={heroContent.secondaryCta.href}>
              {heroContent.secondaryCta.label}
            </a>
          </div>

          <ul className="hero-highlights">
            {heroContent.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="hero-visual">
          <div className="hero-scene-frame">{scene}</div>
          <div className="hero-portrait-card">
            <img src={heroContent.portrait} alt="Daniel Krejza portrait" />
            <div>
              <p>Experience</p>
              <strong>4+ years across product engineering, cloud, and automation</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
