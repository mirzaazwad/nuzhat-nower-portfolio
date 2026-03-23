"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Aphrodite-inspired decorative shell spiral
function ShellSpiral({
  position = [0, 0, 0] as [number, number, number],
  scale = 1,
}) {
  const mesh = useRef<THREE.Mesh>(null);

  const shellGeometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const turns = 3;
    const pointsPerTurn = 30;

    for (let i = 0; i < turns * pointsPerTurn; i++) {
      const t = i / (turns * pointsPerTurn);
      const angle = i * 0.3;
      const radius = 0.1 + t * 0.4;

      points.push(
        new THREE.Vector3(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          t * 0.5,
        ),
      );
    }

    const curve = new THREE.CatmullRomCurve3(points);
    return new THREE.TubeGeometry(curve, 100, 0.05, 8, false);
  }, []);

  useFrame((state) => {
    if (!mesh.current) return;
    const time = state.clock.elapsedTime;
    mesh.current.rotation.z = time * 0.1;
    mesh.current.position.y = position[1] + Math.sin(time * 0.5) * 0.1;
  });

  return (
    <mesh ref={mesh} position={position} scale={scale}>
      <primitive object={shellGeometry} attach="geometry" />
      <meshStandardMaterial
        color="#d4af37"
        metalness={0.8}
        roughness={0.2}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
}

// Aphrodite's golden apple - symbol of beauty
function GoldenApple({
  position = [0, 0, 0] as [number, number, number],
  scale = 1,
}) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!mesh.current) return;
    const time = state.clock.elapsedTime;
    mesh.current.rotation.y = time * 0.3;
    mesh.current.position.y = position[1] + Math.sin(time * 0.8) * 0.15;
  });

  return (
    <mesh ref={mesh} position={position} scale={scale}>
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshStandardMaterial
        color="#ffd700"
        metalness={0.9}
        roughness={0.1}
        emissive="#d4af37"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

// Rose petals for Aphrodite
function RosePetal({
  position,
  delay = 0,
}: {
  position: [number, number, number];
  delay?: number;
}) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!mesh.current) return;
    const time = state.clock.elapsedTime + delay;
    mesh.current.rotation.x = Math.sin(time * 0.5) * 0.3;
    mesh.current.rotation.z = Math.cos(time * 0.3) * 0.2;
    mesh.current.position.y = position[1] + Math.sin(time * 0.4) * 0.05;
  });

  return (
    <mesh ref={mesh} position={position}>
      <planeGeometry args={[0.15, 0.2]} />
      <meshStandardMaterial
        color="#ff69b4"
        transparent
        opacity={0.6}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Main Aphrodite figure component
export function AphroditeFigure({
  variant = "shell" as "shell" | "apple" | "petals" | "combined",
}) {
  if (variant === "combined") {
    return (
      <>
        <ShellSpiral position={[-2, 1, -1]} scale={0.8} />
        <GoldenApple position={[2, -0.5, -2]} scale={1.2} />
        <RosePetal position={[-1.5, 0.5, 0]} delay={0} />
        <RosePetal position={[0, 0.8, -0.5]} delay={1} />
        <RosePetal position={[1.5, 0.2, -1]} delay={2} />
        <ambientLight intensity={0.4} />
        <pointLight position={[3, 3, 3]} intensity={0.5} color="#d4af37" />
      </>
    );
  }

  if (variant === "shell") {
    return (
      <>
        <ShellSpiral position={[0, 0, 0]} scale={1} />
        <ambientLight intensity={0.4} />
      </>
    );
  }

  if (variant === "apple") {
    return (
      <>
        <GoldenApple position={[0, 0, 0]} scale={1.5} />
        <ambientLight intensity={0.4} />
        <pointLight position={[3, 3, 3]} intensity={0.3} color="#ffd700" />
      </>
    );
  }

  return (
    <>
      <RosePetal position={[-0.5, 0.5, 0]} delay={0} />
      <RosePetal position={[0, 0, 0]} delay={1} />
      <RosePetal position={[0.5, -0.3, 0]} delay={2} />
      <ambientLight intensity={0.4} />
    </>
  );
}
