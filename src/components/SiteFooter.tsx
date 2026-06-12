import { footerContent, navigationItems } from "../content/siteContent";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container site-footer-inner">
        <div>
          <p className="footer-signature">{footerContent.signature}</p>
          <p className="footer-note">{footerContent.note}</p>
        </div>

        <nav className="footer-links" aria-label="Footer">
          {navigationItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="container footer-meta">
        <span>© {new Date().getFullYear()} Daniel Krejza</span>
        <span>Built with React, TypeScript & Three.js</span>
      </div>
    </footer>
  );
}
