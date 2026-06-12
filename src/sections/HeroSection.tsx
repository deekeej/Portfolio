import { heroContent } from "../content/siteContent";

export function HeroSection() {
  return (
    <section className="hero-section" id="top">
      <div className="container hero-inner">
        <p className="eyebrow" data-reveal>
          {heroContent.eyebrow}
        </p>

        <h1 className="hero-title" data-reveal>
          {heroContent.titleLines.map((line) => (
            <span
              key={line.text}
              className={line.accent ? "hero-line hero-line-accent" : "hero-line"}
            >
              {line.text}
              {line.accent ? (
                <span className="type-cursor" aria-hidden="true" />
              ) : null}
            </span>
          ))}
        </h1>

        <p className="hero-description" data-reveal>
          {heroContent.description}
        </p>

        <div className="hero-actions" data-reveal>
          <a className="btn btn-primary" href={heroContent.primaryCta.href}>
            {heroContent.primaryCta.label}
          </a>
          <a className="btn btn-ghost" href={heroContent.secondaryCta.href}>
            {heroContent.secondaryCta.label}
          </a>
        </div>

        <dl className="hero-stats" data-reveal>
          {heroContent.stats.map((stat) => (
            <div key={stat.label} className="hero-stat">
              <dt>{stat.value}</dt>
              <dd>{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      <a className="scroll-cue" href="#work" aria-label="Scroll to selected work">
        <span className="scroll-cue-label">Scroll</span>
        <span className="scroll-cue-line" aria-hidden="true" />
      </a>
    </section>
  );
}
