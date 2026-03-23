"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Persephone's pomegranate - symbol of the underworld
function Pomegranate({ position = [0, 0, 0] as [number, number, number], scale = 1 }) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!mesh.current) return;
    const time = state.clock.elapsedTime;
    mesh.current.rotation.y = time * 0.2;
    mesh.current.position.y = position[1] + Math.sin(time * 0.6) * 0.1;
  });

  return (
    <mesh ref={mesh} position={position} scale={scale}>
      <icosahedronGeometry args={[0.25, 1]} />
      <meshStandardMaterial
        color="#8b0000"
        metalness={0.3}
        roughness={0.6}
        emissive="#4a0000"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

// Spring flower for Persephone (representing spring growth)
function SpringFlower({ position, color = "#ff69b4", delay = 0 }: { position: [number, number, number]; color?: string; delay?: number }) {
  const group = useRef<THREE.Group>(null);
  const petalCount = 5;

  useFrame((state) => {
    if (!group.current) return;
    const time = state.clock.elapsedTime + delay;
    group.current.rotation.z = Math.sin(time * 0.3) * 0.1;
    group.current.position.y = position[1] + Math.sin(time * 0.5) * 0.03;
  });

  return (
    <group ref={group} position={position}>
      {/* Center */}
      <mesh>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#ffd700" />
      </mesh>

      {/* Petals */}
      {Array.from({ length: petalCount }).map((_, i) => (
        <mesh
          key={i}
          rotation={[Math.PI / 6, (i / petalCount) * Math.PI * 2, 0]}
          position={[
            Math.cos((i / petalCount) * Math.PI * 2) * 0.08,
            Math.sin((i / petalCount) * Math.PI * 2) * 0.08,
            0
          ]}
        >
          <planeGeometry args={[0.08, 0.15]} />
          <meshStandardMaterial
            color={color}
            transparent
            opacity={0.8}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* Stem */}
      <mesh position={[0, -0.15, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 0.3, 8]} />
        <meshStandardMaterial color="#228b22" />
      </mesh>
    </group>
  );
}

// Wheat/grain stalks (Demeter/Persephone connection)
function WheatStalk({ position, delay = 0 }: { position: [number, number, number]; delay?: number }) {
  const mesh = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!mesh.current) return;
    const time = state.clock.elapsedTime + delay;
    mesh.current.rotation.z = Math.sin(time * 0.4) * 0.1;
  });

  return (
    <group ref={mesh} position={position}>
      {/* Stalk */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.01, 0.015, 0.4, 8]} />
        <meshStandardMaterial color="#daa520" />
      </mesh>

      {/* Wheat head */}
      <mesh position={[0, 0.45, 0]}>
        <coneGeometry args={[0.04, 0.15, 8]} />
        <meshStandardMaterial color="#ffd700" metalness={0.3} roughness={0.5} />
      </mesh>
    </group>
  );
}

// Persephone's crown of flowers
function FlowerCrown({ radius = 0.5, flowerCount = 8 }: { radius?: number; flowerCount?: number }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const time = state.clock.elapsedTime;
    group.current.rotation.y = time * 0.1;
  });

  const colors = ["#ff69b4", "#ff1493", "#ffb6c1", "#ffc0cb", "#ff69b4"];

  return (
    <group ref={group}>
      {Array.from({ length: flowerCount }).map((_, i) => {
        const angle = (i / flowerCount) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        return (
          <SpringFlower
            key={i}
            position={[x, 0, z]}
            color={colors[i % colors.length]}
            delay={i * 0.5}
          />
        );
      })}
    </group>
  );
}

// Main Persephone flora component
export function PersephoneFlora({ variant = "spring" as "spring" | "underworld" | "crown" }) {
  if (variant === "crown") {
    return (
      <>
        <FlowerCrown radius={0.5} flowerCount={6} />
        <ambientLight intensity={0.5} />
      </>
    );
  }

  if (variant === "underworld") {
    return (
      <>
        <Pomegranate position={[0, 0, 0]} scale={1.5} />
        <Pomegranate position={[-0.8, -0.3, 0.5]} scale={0.8} />
        <Pomegranate position={[0.6, 0.2, -0.3]} scale={1} />
        <ambientLight intensity={0.3} />
        <pointLight position={[2, 2, 2]} intensity={0.4} color="#8b0000" />
      </>
    );
  }

  // Spring variant
  return (
    <>
      <SpringFlower position={[-0.5, 0, 0]} color="#ff69b4" delay={0} />
      <SpringFlower position={[0, 0.1, 0.3]} color="#ffb6c1" delay={0.5} />
      <SpringFlower position={[0.5, -0.1, 0]} color="#ff1493" delay={1} />
      <WheatStalk position={[-0.8, -0.2, -0.2]} delay={0} />
      <WheatStalk position={[0.8, -0.15, -0.1]} delay={1.5} />
      <ambientLight intensity={0.5} />
      <pointLight position={[2, 3, 2]} intensity={0.3} color="#ffd700" />
    </>
  );
}