"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { ArtisticScene } from "./artistic-scene";

/**
 * Self-contained Three.js scene for the hero section.
 * Canvas + scene are co-located so R3F's custom renderer
 * can properly reconcile all child components.
 */
export function ThreeScene() {
  return (
    <div className="absolute inset-0 -z-10 opacity-30">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        flat
      >
        <Suspense fallback={null}>
          <ArtisticScene intensity="high" />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
