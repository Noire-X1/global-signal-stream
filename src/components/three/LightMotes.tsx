import { useRef, useMemo, useCallback } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import { getRegionFromPosition, getStoryForRegion, type NewsStory } from "@/data/newsStories";

const PARTICLE_COUNT = 90;

type Phase = "drift" | "brighten" | "fade";

interface ParticleState {
  phase: Phase;
  timer: number;
  targetOpa: number;
  brightenDur: number;
}

interface LightMotesProps {
  onMoteClick?: (story: NewsStory) => void;
}

const randomOnSphere = (r: number): [number, number, number] => {
  const theta = Math.random() * 2 * Math.PI;
  const phi = Math.acos(2 * Math.random() - 1);
  return [
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.sin(phi) * Math.sin(theta),
    r * Math.cos(phi),
  ];
};

const moteVertex = `
  attribute float aOpacity;
  attribute float aSize;
  varying float vOpacity;
  void main() {
    vOpacity = aOpacity;
    vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * (380.0 / -mvPos.z);
    gl_Position = projectionMatrix * mvPos;
  }
`;

const moteFragment = `
  varying float vOpacity;
  const vec3 COL_PURPLE = vec3(0.659, 0.333, 0.969);
  const vec3 COL_BLUE   = vec3(0.231, 0.510, 0.961);
  const vec3 COL_LILAC  = vec3(0.847, 0.706, 0.996);
  void main() {
    float dist = length(gl_PointCoord - 0.5) * 2.0;
    float alpha = smoothstep(1.0, 0.1, dist) * vOpacity;
    float selector = fract(gl_FragCoord.x * 0.031 + gl_FragCoord.y * 0.017);
    vec3 color = selector < 0.4 ? COL_PURPLE
               : selector < 0.72 ? COL_BLUE
               : COL_LILAC;
    gl_FragColor = vec4(color, alpha);
  }
`;

const LightMotes = ({ onMoteClick }: LightMotesProps) => {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, opacities, sizes, velocities, states } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const op = new Float32Array(PARTICLE_COUNT);
    const sz = new Float32Array(PARTICLE_COUNT);
    const vel = new Float32Array(PARTICLE_COUNT * 3);
    const st: ParticleState[] = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const r = 1.04 + Math.random() * 0.08;
      const [x, y, z] = randomOnSphere(r);
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      vel[i * 3] = (Math.random() - 0.5) * 0.0003;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.0003;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.0003;

      op[i] = 0;
      sz[i] = 2.5 + Math.random() * 4.0;

      st.push({
        phase: "drift",
        timer: Math.random() * 6000,
        targetOpa: 0.4 + Math.random() * 0.45,
        brightenDur: 1200 + Math.random() * 1800,
      });
    }
    return { positions: pos, opacities: op, sizes: sz, velocities: vel, states: st };
  }, []);

  const shaderMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: moteVertex,
        fragmentShader: moteFragment,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    []
  );

  const handleClick = useCallback(
    (e: ThreeEvent<MouseEvent>) => {
      if (!onMoteClick || e.index === undefined) return;
      e.stopPropagation();
      const i = e.index;
      const geo = pointsRef.current?.geometry;
      if (!geo) return;
      const posArr = geo.attributes.position.array as Float32Array;
      const x = posArr[i * 3];
      const y = posArr[i * 3 + 1];
      const z = posArr[i * 3 + 2];
      const region = getRegionFromPosition(x, y, z);
      const story = getStoryForRegion(region);
      onMoteClick(story);
    },
    [onMoteClick]
  );

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const geo = pointsRef.current.geometry;
    const posArr = geo.attributes.position.array as Float32Array;
    const opArr = geo.attributes.aOpacity.array as Float32Array;
    const szArr = geo.attributes.aSize.array as Float32Array;
    const ms = delta * 1000;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const s = states[i];
      s.timer += ms;

      // Drift
      posArr[i * 3] += velocities[i * 3];
      posArr[i * 3 + 1] += velocities[i * 3 + 1];
      posArr[i * 3 + 2] += velocities[i * 3 + 2];

      // Re-normalize to sphere surface
      const len = Math.sqrt(
        posArr[i * 3] ** 2 + posArr[i * 3 + 1] ** 2 + posArr[i * 3 + 2] ** 2
      );
      const r = 1.04 + Math.sin(s.timer * 0.0005) * 0.04;
      posArr[i * 3] = (posArr[i * 3] / len) * r;
      posArr[i * 3 + 1] = (posArr[i * 3 + 1] / len) * r;
      posArr[i * 3 + 2] = (posArr[i * 3 + 2] / len) * r;

      switch (s.phase) {
        case "drift":
          opArr[i] = 0.12 + Math.sin(s.timer * 0.001 + i) * 0.08;
          if (s.timer > 2000 + Math.random() * 4000) {
            s.phase = "brighten";
            s.timer = 0;
          }
          break;
        case "brighten":
          opArr[i] = Math.min(opArr[i] + delta * 0.6, 0.85);
          szArr[i] = Math.min(szArr[i] + delta * 3.0, 9.0);
          if (s.timer > s.brightenDur) {
            s.phase = "fade";
            s.timer = 0;
          }
          break;
        case "fade":
          opArr[i] = Math.max(opArr[i] - delta * 0.4, 0.0);
          if (opArr[i] <= 0.0) {
            s.phase = "drift";
            s.timer = 0;
            szArr[i] = 2.5 + Math.random() * 4.0;
            s.targetOpa = 0.4 + Math.random() * 0.45;
            s.brightenDur = 1200 + Math.random() * 1800;
            const [nx, ny, nz] = randomOnSphere(1.04);
            posArr[i * 3] = nx;
            posArr[i * 3 + 1] = ny;
            posArr[i * 3 + 2] = nz;
          }
          break;
      }
    }

    geo.attributes.position.needsUpdate = true;
    geo.attributes.aOpacity.needsUpdate = true;
    geo.attributes.aSize.needsUpdate = true;
  });

  return (
    <points
      ref={pointsRef}
      material={shaderMat}
      onClick={handleClick}
      onPointerOver={() => { document.body.style.cursor = "pointer"; }}
      onPointerOut={() => { document.body.style.cursor = "default"; }}
    >
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={PARTICLE_COUNT} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-aOpacity" count={PARTICLE_COUNT} array={opacities} itemSize={1} />
        <bufferAttribute attach="attributes-aSize" count={PARTICLE_COUNT} array={sizes} itemSize={1} />
      </bufferGeometry>
    </points>
  );
};

export default LightMotes;
