import { useEffect, useState } from "react";
import { navigationItems } from "../content/siteContent";

function NavIcon({ href }: { href: string }) {
  if (href === "#top") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4.5v-5.5h-5V21H5a1 1 0 0 1-1-1z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (href === "#work") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect
          x="4"
          y="6"
          width="16"
          height="12"
          rx="2.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M9 18V5.5h6V18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (href === "#capabilities") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 3.5 18.5 7v10L12 20.5 5.5 17V7z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M12 3.5V12l6.5-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (href === "#experience") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M7 5.5h10a2 2 0 0 1 2 2v11H5v-11a2 2 0 0 1 2-2Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M9 5.5V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1.5M8.5 11h7M8.5 14.5h5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4.5 7.5A2.5 2.5 0 0 1 7 5h10a2.5 2.5 0 0 1 2.5 2.5v9A2.5 2.5 0 0 1 17 19H7a2.5 2.5 0 0 1-2.5-2.5z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="m6 8 6 5 6-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SiteNav() {
  const [activeHref, setActiveHref] = useState("#top");

  useEffect(() => {
    const sections = navigationItems
      .map((item) => document.querySelector(item.href))
      .filter((section): section is Element => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (current) {
          setActiveHref(`#${current.target.id}`);
        }
      },
      {
        rootMargin: "-18% 0px -55% 0px",
        threshold: [0.2, 0.4, 0.6],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header className="site-nav">
        <div className="container site-nav-inner">
          <a className="brand-mark" href="#top">
            DK
          </a>

          <nav className="nav-links" aria-label="Primary">
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={activeHref === item.href ? "is-active" : ""}
                onClick={() => setActiveHref(item.href)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <nav className="mobile-rail" aria-label="Mobile primary">
        {navigationItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            aria-label={item.label}
            title={item.label}
            className={activeHref === item.href ? "is-active" : ""}
            onClick={() => setActiveHref(item.href)}
          >
            <NavIcon href={item.href} />
            <span className="mobile-rail-label">{item.shortLabel}</span>
          </a>
        ))}
      </nav>
    </>
  );
}
