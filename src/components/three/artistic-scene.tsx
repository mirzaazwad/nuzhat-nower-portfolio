"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Green particles (Slytherin-inspired)
function GreenParticles({ count = 100 }) {
  const mesh = useRef<THREE.InstancedMesh>(null);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 10,
        ] as [number, number, number], 
        scale: Math.random() * 0.1 + 0.02,
        speed: Math.random() * 0.5 + 0.1,
        rotation: Math.random() * Math.PI * 2,
      });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!mesh.current) return;

    particles.forEach((particle, i) => {
      const time = state.clock.elapsedTime;
      const speed = particle.speed;

      dummy.position.set(
        particle.position[0] + Math.sin(time * speed + i) * 0.5,
        particle.position[1] + Math.cos(time * speed * 0.5 + i) * 0.3,
        particle.position[2],
      );

      dummy.rotation.z = particle.rotation + time * speed * 0.1;
      dummy.scale.setScalar(particle.scale);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });

    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <circleGeometry args={[1, 32]} />
      <meshBasicMaterial
        color="#1a5d4a"
        transparent
        opacity={0.4}
        depthWrite={false}
      />
    </instancedMesh>
  );
}

// Gold particles (Hufflepuff-inspired)
function GoldParticles({ count = 80 }) {
  const mesh = useRef<THREE.InstancedMesh>(null);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 25,
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 8,
        ],
        rotation: Math.random() * Math.PI * 2,
        scale: Math.random() * 0.15 + 0.05,
        speed: Math.random() * 0.3 + 0.1,
        phase: Math.random() * Math.PI * 2,
      });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!mesh.current) return;

    particles.forEach((petal, i) => {
      const time = state.clock.elapsedTime;

      dummy.position.set(
        petal.position[0] + Math.sin(time * petal.speed + petal.phase) * 0.8,
        petal.position[1] +
          Math.cos(time * petal.speed * 0.7 + petal.phase) * 0.5 -
          ((time * 0.05) % 10),
        petal.position[2] + Math.sin(time * petal.speed * 0.3) * 0.3,
      );

      dummy.rotation.x = petal.rotation + time * 0.2;
      dummy.rotation.z = petal.rotation + time * 0.15;
      dummy.scale.setScalar(petal.scale);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });

    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <coneGeometry args={[0.5, 1, 4]} />
      <meshBasicMaterial
        color="#e0f780"
        transparent
        opacity={0.3}
        depthWrite={false}
      />
    </instancedMesh>
  );
}

// Persephone-inspired floating flowers
function FloatingFlowers({ count = 30 }) {
  const mesh = useRef<THREE.InstancedMesh>(null);

  const flowers = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 8,
        ],
        scale: Math.random() * 0.08 + 0.03,
        speed: Math.random() * 0.2 + 0.1,
        phase: Math.random() * Math.PI * 2,
      });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const flowerShape = useMemo(() => {
    const shape = new THREE.Shape();
    const x = 0,
      y = 0;
    shape.moveTo(x, y + 0.5);
    shape.bezierCurveTo(x + 0.5, y + 0.5, x + 0.5, y, x, y - 0.5);
    shape.bezierCurveTo(x - 0.5, y, x - 0.5, y + 0.5, x, y + 0.5);
    return shape;
  }, []);

  useFrame((state) => {
    if (!mesh.current) return;

    flowers.forEach((flower, i) => {
      const time = state.clock.elapsedTime;

      dummy.position.set(
        flower.position[0] + Math.sin(time * flower.speed + flower.phase) * 1,
        flower.position[1] +
          Math.cos(time * flower.speed * 0.8 + flower.phase) * 0.6,
        flower.position[2],
      );

      dummy.rotation.z = time * flower.speed * 0.2;
      dummy.scale.setScalar(flower.scale);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });

    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <shapeGeometry args={[flowerShape]} />
      <meshBasicMaterial
        color="#2d8b53"
        transparent
        opacity={0.35}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </instancedMesh>
  );
}

// Main artistic scene combining all elements
export function ArtisticScene({
  intensity = "medium" as "low" | "medium" | "high",
}) {
  const greenCount =
    intensity === "low" ? 50 : intensity === "medium" ? 100 : 150;
  const goldCount = intensity === "low" ? 25 : intensity === "medium" ? 50 : 80;
  const flowerCount =
    intensity === "low" ? 15 : intensity === "medium" ? 30 : 50;

  return (
    <>
      <ambientLight intensity={0.5} />
      <GreenParticles count={greenCount} />
      <GoldParticles count={goldCount} />
      <FloatingFlowers count={flowerCount} />
    </>
  );
}
