"use client";

import { Suspense, ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";

interface ThreeCanvasProps {
  children: ReactNode;
  className?: string;
  cameraPosition?: [number, number, number];
}

export function ThreeCanvas({
  children,
  className = "",
  cameraPosition = [0, 0, 5],
}: ThreeCanvasProps) {
  return (
    <div className={`absolute inset-0 -z-10 ${className}`}>
      <Canvas
        camera={{ position: cameraPosition, fov: 75 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          {children}
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
