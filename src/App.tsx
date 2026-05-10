import { Canvas } from "@react-three/fiber";
import { useEffect } from "react";
import { ContactSection } from "./sections/ContactSection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { HeroSection } from "./sections/HeroSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { ServicesSection } from "./sections/ServicesSection";
import { SiteFooter } from "./components/SiteFooter";
import { SiteNav } from "./components/SiteNav";
import { HeroScene } from "./scene/HeroScene";

function App() {
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

  return (
    <div className="site-shell">
      <div className="site-chrome" aria-hidden="true">
        <div className="site-gradient site-gradient-left" />
        <div className="site-gradient site-gradient-right" />
        <div className="site-grid" />
        <div className="cursor-glow" />
      </div>

      <SiteNav />

      <main>
        <HeroSection
          scene={
            <Canvas
              className="hero-canvas"
              camera={{ position: [0, 0, 7], fov: 45 }}
              dpr={[1, 1.25]}
              gl={{ antialias: false, powerPreference: "high-performance" }}
            >
              <HeroScene />
            </Canvas>
          }
        />
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
