import { Canvas } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import { ContactSection } from "./sections/ContactSection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { HeroSection } from "./sections/HeroSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { ServicesSection } from "./sections/ServicesSection";
import { SiteFooter } from "./components/SiteFooter";
import { SiteNav } from "./components/SiteNav";
import { SkillsMarquee } from "./components/SkillsMarquee";
import { BackgroundScene } from "./scene/BackgroundScene";

function App() {
  const prefersReducedMotion = useMemo(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  useEffect(() => {
    const supportsPointerTracking = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;

    if (!supportsPointerTracking) {
      document.documentElement.style.setProperty("--cursor-x", "50vw");
      document.documentElement.style.setProperty("--cursor-y", "30vh");
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      document.documentElement.style.setProperty(
        "--cursor-x",
        `${event.clientX}px`
      );
      document.documentElement.style.setProperty(
        "--cursor-y",
        `${event.clientY}px`
      );
    };

    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  useEffect(() => {
    const revealed = document.querySelectorAll("[data-reveal]");

    if (prefersReducedMotion) {
      revealed.forEach((element) => element.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    revealed.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <div className="site-shell">
      <div className="scene-layer" aria-hidden="true">
        <Canvas
          camera={{ position: [0, 0, 7], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ antialias: false, powerPreference: "high-performance" }}
          frameloop={prefersReducedMotion ? "demand" : "always"}
        >
          <BackgroundScene />
        </Canvas>
      </div>

      <div className="site-overlays" aria-hidden="true">
        <div className="cursor-glow" />
        <div className="page-vignette" />
        <div className="film-grain" />
      </div>

      <SiteNav />

      <main className="site-content">
        <HeroSection />
        <SkillsMarquee />
        <ProjectsSection />
        <ServicesSection />
        <ExperienceSection />
        <ContactSection />
      </main>

      <SiteFooter />
    </div>
  );
}

export default App;
