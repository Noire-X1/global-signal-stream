import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
// postprocessing removed for compatibility
import GlobeMesh from "./GlobeMesh";
import LightMotes from "./LightMotes";
import type { NewsStory } from "@/data/newsStories";

interface WorldCanvasProps {
  onMoteClick?: (story: NewsStory) => void;
}

const WorldCanvas = ({ onMoteClick }: WorldCanvasProps) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        touchAction: "none",
      }}
    >
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 1.85], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
          frameloop="always"
          raycaster={{ params: { Points: { threshold: 0.05 } } as any }}
        >
          <pointLight
            position={[0, 8, 0]}
            intensity={0.4}
            color="#1E1040"
          />
          <GlobeMesh />
          <LightMotes onMoteClick={onMoteClick} />
          <EffectComposer>
            <Bloom
              luminanceThreshold={0.12}
              luminanceSmoothing={0.9}
              intensity={1.8}
              radius={0.85}
              mipmapBlur
            />
          </EffectComposer>
        </Canvas>
      </Suspense>
    </div>
  );
};

export default WorldCanvas;
