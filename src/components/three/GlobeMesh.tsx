import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;

  void main() {
    vNormal   = normalize(normalMatrix * normal);
    vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
    vUv       = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;

  const vec3 COL_OCEAN_BASE   = vec3(0.018, 0.018, 0.022);
  const vec3 COL_LAND_BASE    = vec3(0.055, 0.032, 0.075);
  const vec3 COL_NEON_PURPLE  = vec3(0.659, 0.333, 0.969);
  const vec3 COL_NEON_BLUE    = vec3(0.231, 0.510, 0.961);
  const vec3 COL_NEON_LILAC   = vec3(0.847, 0.706, 0.996);

  float hash(vec2 p) {
    p = fract(p * vec2(234.34, 435.345));
    p += dot(p, p + 34.23);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i),             hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p = rot * p * 2.0 + shift;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    // Continent mask
    vec2 uv_scaled = vUv * vec2(4.2, 2.8) + vec2(0.3, 0.1);
    float landMask = fbm(uv_scaled);
    landMask = smoothstep(0.52, 0.60, landMask);

    // Base surface
    vec3 surfaceColor = mix(COL_OCEAN_BASE, COL_LAND_BASE, landMask);

    // Subsurface ocean noise
    float oceanNoise = fbm(vUv * 12.0 + vec2(1.7, 3.1)) * 0.012;
    surfaceColor += vec3(0.0, 0.0, oceanNoise) * (1.0 - landMask);

    // Continent inner glow
    float innerGlow = landMask * fbm(uv_scaled * 1.8 + vec2(5.0)) * 0.18;
    surfaceColor += COL_NEON_PURPLE * innerGlow;

    // Fresnel rim — bioluminescent edge glow
    vec3 viewDir = normalize(-vPosition);
    float fresnel = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 3.5);
    vec3 rimColor = mix(COL_NEON_BLUE, COL_NEON_PURPLE, landMask);
    rimColor = mix(rimColor, COL_NEON_LILAC, pow(fresnel, 6.0) * 0.6);
    vec3 rimGlow = rimColor * fresnel * 2.2;

    // Polar ice caps
    float northPole = smoothstep(0.82, 1.00, vUv.y);
    float southPole = smoothstep(0.18, 0.00, vUv.y);
    float poleMask = clamp(northPole + southPole, 0.0, 1.0);
    float poleShimmer = fbm(vUv * 20.0) * 0.4 + 0.6;
    vec3 poleGlow = COL_NEON_BLUE * poleMask * poleShimmer * 0.55;

    // City light scatter
    float cityNoise = step(0.78, fbm(vUv * 28.0 + vec2(9.3, 2.7)));
    float cityGlow = cityNoise * landMask * 0.22;
    surfaceColor += COL_NEON_LILAC * cityGlow;

    // Composite
    vec3 finalColor = surfaceColor + rimGlow + poleGlow;
    finalColor = finalColor / (finalColor + vec3(0.8));

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

const GlobeMesh = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      side: THREE.FrontSide,
    });
  }, []);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.055;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[0.28, 0, 0]} material={shaderMaterial}>
      <sphereGeometry args={[1, 128, 128]} />
    </mesh>
  );
};

export default GlobeMesh;
