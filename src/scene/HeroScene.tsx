import { Environment, Float, Sparkles, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";

function lerp(current: number, target: number, factor: number) {
  return current + (target - current) * factor;
}

function CodePanel() {
  const codeLines = [
    "const build = (idea) => deploy(idea);",
    "if (user.needsClarity) ship('clean-ui');",
    "stack.use(['react', 'ts', 'node']);",
    "animate(scene).withPrecision();",
  ];

  return (
    <group>
      <Text
        position={[-1.22, 1.2, 0]}
        fontSize={0.14}
        color="#8bdcff"
        anchorX="left"
        anchorY="middle"
        maxWidth={2.5}
      >
        src/portfolio.tsx
      </Text>

      {codeLines.map((line, index) => (
        <Text
          key={line}
          position={[-1.2, 0.68 - index * 0.48, 0]}
          fontSize={0.12}
          color={index % 2 === 0 ? "#d9f3ff" : "#9fd6ff"}
          anchorX="left"
          anchorY="middle"
          maxWidth={2.5}
        >
          {line}
        </Text>
      ))}
    </group>
  );
}

export function HeroScene() {
  const clusterRef = useRef<Group>(null);
  const panelRef = useRef<Group>(null);

  useFrame(({ pointer, clock }) => {
    const cluster = clusterRef.current;
    const panel = panelRef.current;
    const elapsed = clock.getElapsedTime();

    if (cluster) {
      cluster.rotation.x = lerp(cluster.rotation.x, pointer.y * 0.18, 0.05);
      cluster.rotation.y = lerp(cluster.rotation.y, pointer.x * 0.36, 0.05);
      cluster.position.x = lerp(cluster.position.x, pointer.x * 0.28, 0.045);
      cluster.position.y = lerp(
        cluster.position.y,
        pointer.y * 0.18 + Math.sin(elapsed * 0.75) * 0.08,
        0.045
      );
    }

    if (panel) {
      panel.rotation.z = lerp(panel.rotation.z, pointer.x * -0.045, 0.04);
    }
  });

  return (
    <>
      <color attach="background" args={["#050816"]} />
      <fog attach="fog" args={["#050816", 8, 18]} />

      <ambientLight intensity={0.85} />
      <directionalLight position={[4, 6, 3]} intensity={2} color="#9fc0ff" />
      <pointLight position={[-3.5, -1.8, 2.5]} intensity={1.5} color="#7cf2ff" />
      <pointLight position={[2.6, 1.2, 2]} intensity={1.1} color="#f6a55f" />

      <Sparkles
        count={75}
        scale={[10, 6, 6]}
        size={1.9}
        speed={0.28}
        color="#9be7ff"
      />

      <group ref={clusterRef}>
        <Float speed={1.4} rotationIntensity={0.12} floatIntensity={0.35}>
          <group ref={panelRef} rotation={[-0.12, -0.38, -0.06]}>
            <CodePanel />
          </group>
        </Float>
      </group>

      <Environment preset="city" />
    </>
  );
}
