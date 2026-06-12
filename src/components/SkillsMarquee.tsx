import { marqueeSkills } from "../content/siteContent";

function MarqueeRow({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <ul className="marquee-row" aria-hidden={ariaHidden}>
      {marqueeSkills.map((skill) => (
        <li key={skill}>
          <span className="marquee-star" aria-hidden="true">
            ✦
          </span>
          {skill}
        </li>
      ))}
    </ul>
  );
}

export function SkillsMarquee() {
  return (
    <div className="skills-marquee" role="presentation">
      <div className="marquee-track">
        <MarqueeRow />
        <MarqueeRow ariaHidden />
      </div>
    </div>
  );
}
