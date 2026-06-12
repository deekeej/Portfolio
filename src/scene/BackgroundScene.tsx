import { RoundedBox, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import type { MutableRefObject } from "react";

type ScrollRef = MutableRefObject<number>;

const MONO_FONT = "/fonts/JetBrainsMono-Regular.ttf";

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function lerp(current: number, target: number, factor: number) {
  return current + (target - current) * factor;
}

/* ------------------------------------------------------------- backdrop */

const BACKDROP_VERTEX = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const BACKDROP_FRAGMENT = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  uniform float uTime;
  uniform float uScroll;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 4; i++) {
      value += amplitude * noise(p);
      p *= 2.03;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 uv = vUv;
    vec2 p = uv * vec2(2.4, 1.6);
    float t = uTime * 0.025;
    float drift = uScroll * 0.5;

    float n = fbm(p + vec2(t * 0.6, -t * 0.3 + drift) + fbm(p * 1.6 - t * 0.25) * 0.7);

    vec3 deep = vec3(0.008, 0.014, 0.034);
    vec3 tealGlow = vec3(0.03, 0.20, 0.22);
    vec3 cyan = vec3(0.05, 0.26, 0.34);
    vec3 ember = vec3(0.42, 0.23, 0.12);

    vec3 color = deep;
    color = mix(color, tealGlow, smoothstep(0.4, 0.9, n) * (0.25 + 0.45 * uv.y));
    color = mix(color, cyan, smoothstep(0.62, 0.98, n) * 0.4);

    float emberMask = smoothstep(0.55, 0.0, distance(uv, vec2(0.12, 0.08)));
    color = mix(color, ember, emberMask * fbm(p * 1.3 + t) * 0.3);

    float vignette = smoothstep(1.25, 0.3, distance(uv, vec2(0.5, 0.55)));
    color *= mix(0.5, 1.05, vignette);

    gl_FragColor = vec4(color, 1.0);
  }
`;

function Backdrop({ scrollRef }: { scrollRef: ScrollRef }) {
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
    }),
    []
  );

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.getElapsedTime();
    uniforms.uScroll.value = lerp(
      uniforms.uScroll.value,
      scrollRef.current,
      0.04
    );
  });

  return (
    <mesh position={[0, 0, -16]}>
      <planeGeometry args={[72, 40]} />
      <shaderMaterial
        vertexShader={BACKDROP_VERTEX}
        fragmentShader={BACKDROP_FRAGMENT}
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ------------------------------------------------------------ grid floor */

const GRID_VERTEX = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const GRID_FRAGMENT = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  uniform float uTime;

  void main() {
    vec2 p = vUv * vec2(50.0, 26.0);
    p.y += uTime * 0.35;

    vec2 g = abs(fract(p - 0.5) - 0.5) / fwidth(p);
    float line = 1.0 - min(min(g.x, g.y), 1.0);

    // fade toward the horizon (far edge) and at the sides
    float depthFade = smoothstep(1.0, 0.25, vUv.y);
    float sideFade = smoothstep(0.0, 0.18, vUv.x) * smoothstep(1.0, 0.82, vUv.x);

    vec3 color = vec3(0.22, 0.62, 0.72);
    float alpha = line * depthFade * sideFade * 0.16;

    gl_FragColor = vec4(color, alpha);
  }
`;

function GridFloor() {
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.6, -8]}>
      <planeGeometry args={[80, 36]} />
      <shaderMaterial
        vertexShader={GRID_VERTEX}
        fragmentShader={GRID_FRAGMENT}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

/* ------------------------------------------------------------ glyph rain */

const GLYPHS = [
  "{", "}", "<", ">", ";", "/", "=", "+",
  "*", "#", "$", "0", "1", "(", ")", "&",
];

function createGlyphAtlas() {
  const cell = 128;
  const canvas = document.createElement("canvas");
  canvas.width = cell * 4;
  canvas.height = cell * 4;

  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.fillStyle = "#ffffff";
    ctx.font = `500 88px "JetBrains Mono", Consolas, monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    GLYPHS.forEach((glyph, index) => {
      const col = index % 4;
      const row = Math.floor(index / 4);
      ctx.fillText(glyph, (col + 0.5) * cell, (row + 0.55) * cell);
    });
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  return texture;
}

const RAIN_VERTEX = /* glsl */ `
  attribute float aScale;
  attribute float aSpeed;
  attribute float aGlyph;
  attribute float aPhase;
  attribute vec3 aColor;

  uniform float uTime;
  uniform float uPixelRatio;

  varying vec3 vColor;
  varying float vGlyph;
  varying float vFade;

  void main() {
    vec3 pos = position;
    float range = 19.0;
    pos.y = mod(position.y - uTime * aSpeed, range) - range * 0.5 + 1.0;
    pos.x += sin(uTime * 0.18 + aPhase) * 0.18;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = aScale * uPixelRatio * (140.0 / -mvPosition.z);

    vColor = aColor;
    vGlyph = aGlyph;

    float edge = smoothstep(-9.0, -6.8, pos.y) * (1.0 - smoothstep(6.8, 9.0, pos.y));
    float depth = smoothstep(-30.0, -2.0, mvPosition.z);
    vFade = edge * depth;
  }
`;

const RAIN_FRAGMENT = /* glsl */ `
  precision mediump float;

  uniform sampler2D uAtlas;

  varying vec3 vColor;
  varying float vGlyph;
  varying float vFade;

  void main() {
    float col = mod(vGlyph, 4.0);
    float row = floor(vGlyph / 4.0);
    vec2 cellUv = vec2(gl_PointCoord.x, 1.0 - gl_PointCoord.y);
    vec2 uv = (vec2(col, 3.0 - row) + cellUv) / 4.0;

    vec4 tex = texture2D(uAtlas, uv);
    float alpha = tex.a * vFade * 0.8;
    if (alpha < 0.01) discard;

    gl_FragColor = vec4(vColor, alpha);
  }
`;

const RAIN_COUNT = 520;

function GlyphRain({ scrollRef }: { scrollRef: ScrollRef }) {
  const pointsRef = useRef<THREE.Points>(null);
  const atlas = useMemo(createGlyphAtlas, []);

  const { positions, scales, speeds, glyphs, phases, colors } = useMemo(() => {
    const positions = new Float32Array(RAIN_COUNT * 3);
    const scales = new Float32Array(RAIN_COUNT);
    const speeds = new Float32Array(RAIN_COUNT);
    const glyphs = new Float32Array(RAIN_COUNT);
    const phases = new Float32Array(RAIN_COUNT);
    const colors = new Float32Array(RAIN_COUNT * 3);

    const syntax = [
      new THREE.Color("#86e7ff"),
      new THREE.Color("#c792ea"),
      new THREE.Color("#7fdbca"),
      new THREE.Color("#f0a868"),
      new THREE.Color("#d6e9ff"),
    ];

    for (let i = 0; i < RAIN_COUNT; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 32;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 19;
      positions[i * 3 + 2] = -1.5 - Math.random() * 13;

      scales[i] = 0.7 + Math.random() * 1.3;
      speeds[i] = 0.25 + Math.random() * 0.75;
      glyphs[i] = Math.floor(Math.random() * 16);
      phases[i] = Math.random() * Math.PI * 2;

      const color =
        syntax[Math.random() < 0.55 ? 4 : Math.floor(Math.random() * 4)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return { positions, scales, speeds, glyphs, phases, colors };
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 1.5) },
      uAtlas: { value: atlas },
    }),
    [atlas]
  );

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.getElapsedTime();
    const points = pointsRef.current;
    if (points) {
      points.position.y = lerp(points.position.y, scrollRef.current * 2.6, 0.05);
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
        <bufferAttribute attach="attributes-aSpeed" args={[speeds, 1]} />
        <bufferAttribute attach="attributes-aGlyph" args={[glyphs, 1]} />
        <bufferAttribute attach="attributes-aPhase" args={[phases, 1]} />
        <bufferAttribute attach="attributes-aColor" args={[colors, 3]} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={RAIN_VERTEX}
        fragmentShader={RAIN_FRAGMENT}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* -------------------------------------------------------- code terminal */

type CodeLine = { text: string; color: string };

const CODE_LINES: CodeLine[] = [
  { text: "// ~/portfolio — daniel.krejza", color: "#5f7a99" },
  { text: 'const stack = ["php", "node", "ts"];', color: "#86e7ff" },
  { text: "", color: "#d6e9ff" },
  { text: "async function ship(feature) {", color: "#c792ea" },
  { text: "  await test(feature);", color: "#d6e9ff" },
  { text: "  return deploy(feature);", color: "#d6e9ff" },
  { text: "}", color: "#c792ea" },
  { text: "", color: "#d6e9ff" },
  { text: 'ship("your-next-product"); // ✓ live', color: "#f0a868" },
];

const TOTAL_CHARS = CODE_LINES.reduce((sum, line) => sum + line.text.length, 0);
const TYPE_SPEED = 26; // characters per second

function CodeTerminal({ scrollRef }: { scrollRef: ScrollRef }) {
  const groupRef = useRef<THREE.Group>(null);
  const [typed, setTyped] = useState(
    prefersReducedMotion ? TOTAL_CHARS : 0
  );
  const [blinkOn, setBlinkOn] = useState(true);

  useFrame(({ clock, pointer }) => {
    const elapsed = clock.getElapsedTime();
    const group = groupRef.current;
    const scroll = scrollRef.current;

    if (group) {
      group.position.x = lerp(group.position.x, 2.55 + pointer.x * 0.22, 0.04);
      group.position.y = lerp(
        group.position.y,
        0.3 + Math.sin(elapsed * 0.55) * 0.1 + scroll * 7,
        0.05
      );
      group.rotation.y = lerp(group.rotation.y, -0.32 + pointer.x * 0.12, 0.04);
      group.rotation.x = lerp(group.rotation.x, pointer.y * -0.08, 0.04);
      group.rotation.z = lerp(group.rotation.z, scroll * 0.5, 0.04);
    }

    if (!prefersReducedMotion) {
      const target = Math.min(
        Math.floor(Math.max(elapsed - 1.2, 0) * TYPE_SPEED),
        TOTAL_CHARS
      );
      if (target !== typed) {
        setTyped(target);
      }
    }

    const blink = Math.floor(elapsed * 2.4) % 2 === 0;
    if (blink !== blinkOn) {
      setBlinkOn(blink);
    }
  });

  let remaining = typed;
  let cursorPlaced = false;

  return (
    <group ref={groupRef} position={[2.55, 0.3, 0]} rotation={[0, -0.32, 0]}>
      {/* panel body */}
      <RoundedBox args={[3.7, 2.55, 0.09]} radius={0.09} smoothness={3}>
        <meshStandardMaterial
          color="#070d1a"
          metalness={0.4}
          roughness={0.35}
          transparent
          opacity={0.94}
        />
      </RoundedBox>

      {/* window chrome */}
      {(["#ff5f57", "#febc2e", "#28c840"] as const).map((dot, index) => (
        <mesh key={dot} position={[-1.62 + index * 0.17, 1.08, 0.06]}>
          <circleGeometry args={[0.045, 24]} />
          <meshBasicMaterial color={dot} />
        </mesh>
      ))}
      <Text
        font={MONO_FONT}
        position={[0.25, 1.08, 0.06]}
        fontSize={0.085}
        color="#5f7a99"
        anchorX="center"
        anchorY="middle"
      >
        daniel@prod: ~/portfolio — zsh
      </Text>
      <mesh position={[0, 0.97, 0.051]}>
        <planeGeometry args={[3.55, 0.005]} />
        <meshBasicMaterial color="#1b2941" />
      </mesh>

      {/* code lines with typing reveal */}
      {CODE_LINES.map((line, index) => {
        const visibleCount = Math.max(0, Math.min(line.text.length, remaining));
        remaining -= line.text.length;

        const isTypingHere =
          !cursorPlaced && (remaining < 0 || (remaining === 0 && typed >= TOTAL_CHARS));
        let content = line.text.slice(0, visibleCount);
        if (isTypingHere && (typed < TOTAL_CHARS || blinkOn)) {
          content += "▍";
        }
        if (isTypingHere) {
          cursorPlaced = true;
        }

        if (!content) {
          return null;
        }

        return (
          <Text
            key={`${index}-${line.text}`}
            font={MONO_FONT}
            position={[-1.65, 0.74 - index * 0.185, 0.06]}
            fontSize={0.105}
            color={line.color}
            anchorX="left"
            anchorY="middle"
          >
            {content}
          </Text>
        );
      })}

      {/* glow behind the panel */}
      <pointLight position={[0, 0, 1.6]} intensity={1.6} color="#86e7ff" distance={6} />
    </group>
  );
}

/* ------------------------------------------------------ floating glyphs */

const FLOATERS = [
  { glyph: "{", position: [-4.6, 1.6, -5] as const, color: "#86e7ff", size: 1.1 },
  { glyph: "}", position: [5.6, -1.8, -6.5] as const, color: "#c792ea", size: 1.3 },
  { glyph: "</>", position: [-3.2, -2.2, -4] as const, color: "#f0a868", size: 0.6 },
  { glyph: ";", position: [4.4, 2.6, -8] as const, color: "#7fdbca", size: 1.5 },
] as const;

function FloatingGlyphs({ scrollRef }: { scrollRef: ScrollRef }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock, pointer }) => {
    const elapsed = clock.getElapsedTime();
    const group = groupRef.current;
    if (group) {
      group.position.y = lerp(
        group.position.y,
        scrollRef.current * 4 + Math.sin(elapsed * 0.4) * 0.15,
        0.04
      );
      group.rotation.y = lerp(group.rotation.y, pointer.x * 0.06, 0.03);
    }
  });

  return (
    <group ref={groupRef}>
      {FLOATERS.map((floater) => (
        <Text
          key={floater.glyph}
          font={MONO_FONT}
          position={[...floater.position]}
          fontSize={floater.size}
          color={floater.color}
          anchorX="center"
          anchorY="middle"
          fillOpacity={0.16}
        >
          {floater.glyph}
        </Text>
      ))}
    </group>
  );
}

/* ------------------------------------------------------------ camera rig */

function CameraRig({ scrollRef }: { scrollRef: ScrollRef }) {
  useFrame(({ camera, pointer }) => {
    const scroll = scrollRef.current;
    camera.position.x = lerp(camera.position.x, pointer.x * 0.3, 0.04);
    camera.position.y = lerp(
      camera.position.y,
      -scroll * 2.6 + pointer.y * 0.2,
      0.05
    );
    camera.lookAt(0, -scroll * 2.6, 0);
  });

  return null;
}

/* ----------------------------------------------------------------- scene */

export function BackgroundScene() {
  const scrollRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = max > 0 ? window.scrollY / max : 0;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <color attach="background" args={["#030509"]} />
      <fog attach="fog" args={["#030509", 10, 30]} />

      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 3]} intensity={1.3} color="#9fc0ff" />
      <pointLight position={[-4, -2, 3]} intensity={0.9} color="#7cf2ff" />

      <Backdrop scrollRef={scrollRef} />
      <GridFloor />
      <GlyphRain scrollRef={scrollRef} />
      <CodeTerminal scrollRef={scrollRef} />
      <FloatingGlyphs scrollRef={scrollRef} />
      <CameraRig scrollRef={scrollRef} />
    </>
  );
}
