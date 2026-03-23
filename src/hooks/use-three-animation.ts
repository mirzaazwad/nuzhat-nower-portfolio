"use client";

import { useCallback, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface AnimationConfig {
  speed?: number;
  amplitude?: number;
  phase?: number;
}

// Hook for creating floating animation
export function useFloatingAnimation(config: AnimationConfig = {}) {
  const { speed = 1, amplitude = 1, phase = 0 } = config;
  const meshRef = useRef<THREE.Object3D>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    meshRef.current.position.y = Math.sin(time * speed + phase) * amplitude * 0.1;
    meshRef.current.rotation.y = time * speed * 0.1;
  });

  return meshRef;
}

// Hook for creating rotation animation
export function useRotationAnimation(config: AnimationConfig = {}) {
  const { speed = 1, phase = 0 } = config;
  const meshRef = useRef<THREE.Object3D>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    meshRef.current.rotation.y = time * speed + phase;
  });

  return meshRef;
}

// Hook for creating pulse/scale animation
export function usePulseAnimation(config: AnimationConfig = {}) {
  const { speed = 1, amplitude = 0.1, phase = 0 } = config;
  const meshRef = useRef<THREE.Object3D>(null);
  const initialScale = useRef(1);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    const scale = initialScale.current + Math.sin(time * speed + phase) * amplitude;
    meshRef.current.scale.setScalar(scale);
  });

  return meshRef;
}

// Hook for mouse-following behavior
export function useMouseFollow(config: { intensity?: number; smoothing?: number } = {}) {
  const { intensity = 0.5, smoothing = 0.1 } = config;
  const meshRef = useRef<THREE.Object3D>(null);
  const targetPosition = useRef({ x: 0, y: 0 });
  const { viewport, pointer } = useThree();

  useFrame(() => {
    if (!meshRef.current) return;

    // Convert pointer to world coordinates
    targetPosition.current.x = (pointer.x * viewport.width) / 2 * intensity;
    targetPosition.current.y = (pointer.y * viewport.height) / 2 * intensity;

    // Smoothly interpolate to target
    meshRef.current.position.x += (targetPosition.current.x - meshRef.current.position.x) * smoothing;
    meshRef.current.position.y += (targetPosition.current.y - meshRef.current.position.y) * smoothing;
  });

  return meshRef;
}

// Hook for creating wave-like motion
export function useWaveAnimation(config: { speed?: number; amplitude?: number; wavelength?: number } = {}) {
  const { speed = 1, amplitude = 0.5, wavelength = 2 } = config;
  const positionsRef = useRef<Float32Array | null>(null);

  const initPositions = useCallback((count: number) => {
    positionsRef.current = new Float32Array(count * 3);
    return positionsRef.current;
  }, []);

  useFrame((state) => {
    if (!positionsRef.current) return;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < positionsRef.current.length / 3; i++) {
      const x = positionsRef.current[i * 3];
      const z = positionsRef.current[i * 3 + 2];
      positionsRef.current[i * 3 + 1] = Math.sin(time * speed + x / wavelength + z / wavelength) * amplitude;
    }
  });

  return { initPositions, positionsRef };
}

// Hook for color transitions
export function useColorTransition(colors: string[], duration: number = 2) {
  const meshRef = useRef<THREE.Mesh>(null);
  const colorIndex = useRef(0);
  const materialRef = useRef<THREE.MeshStandardMaterial | null>(null);

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;

    const time = state.clock.elapsedTime;
    const t = (Math.sin(time * (Math.PI / duration)) + 1) / 2;

    const currentIndex = Math.floor(time / duration) % colors.length;
    const nextIndex = (currentIndex + 1) % colors.length;

    const color = new THREE.Color(colors[currentIndex]);
    const nextColor = new THREE.Color(colors[nextIndex]);
    color.lerp(nextColor, t);

    materialRef.current.color = color;
  });

  return { meshRef, materialRef };
}