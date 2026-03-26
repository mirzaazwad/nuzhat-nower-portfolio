"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const SHAFT_H = 3.2;
const BASE_H = 0.22;
const CAPITAL_H = 0.58;
const TOTAL_H = BASE_H + SHAFT_H + CAPITAL_H;
const FIRE_Y = TOTAL_H + 0.06;
const PARTICLE_N = 90;
const SPACING = 4.2;

// ─────────────────────────────────────────────────────────────────────────────
// CANVAS HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Creates a canvas texture with the skill name rendered vertically
 * (rotated 90° so it reads bottom-to-top when placed on the pillar shaft).
 */
function makeShaftTexture(text: string): THREE.CanvasTexture {
  const W = 256;
  const H = 1024;
  const cv = document.createElement("canvas");
  cv.width = W;
  cv.height = H;
  const ctx = cv.getContext("2d")!;

  // Transparent background so the pillar colour shows through
  ctx.clearRect(0, 0, W, H);

  ctx.save();
  ctx.translate(W / 2, H / 2);
  // Rotate –90° → text axis goes from canvas-bottom to canvas-top,
  // which maps to bottom→top on the PlaneGeometry (reads upward on pillar).
  ctx.rotate(-Math.PI / 2);

  // Gold fill with a subtle warm shadow for depth
  ctx.shadowColor = "rgba(0,0,0,0.55)";
  ctx.shadowBlur = 18;
  ctx.shadowOffsetX = 4;
  ctx.shadowOffsetY = 4;

  ctx.fillStyle = "#FFD700";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Fit text into the available height (H, since we're rotated)
  const maxW = H * 0.9;
  let fontSize = 150;
  ctx.font = `bold ${fontSize}px Georgia, serif`;
  while (ctx.measureText(text).width > maxW && fontSize > 48) {
    fontSize -= 4;
    ctx.font = `bold ${fontSize}px Georgia, serif`;
  }

  ctx.fillText(text, 0, 0);
  ctx.restore();

  return new THREE.CanvasTexture(cv);
}

function makeFireSprite(): THREE.CanvasTexture {
  const S = 1024;
  const cv = document.createElement("canvas");
  cv.width = S;
  cv.height = S;
  const ctx = cv.getContext("2d")!;
  const g = ctx.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
  g.addColorStop(0, "rgba(255,255,200,1)");
  g.addColorStop(0.2, "rgba(255,180,40,0.92)");
  g.addColorStop(0.55, "rgba(255,60,0,0.5)");
  g.addColorStop(1, "rgba(255,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, S, S);
  return new THREE.CanvasTexture(cv);
}

// ─────────────────────────────────────────────────────────────────────────────
// GEOMETRY BUILDERS
// ─────────────────────────────────────────────────────────────────────────────
function buildMaterials() {
  return {
    shaft: new THREE.MeshPhongMaterial({ color: 0x022a30, shininess: 18 }),
    capital: new THREE.MeshPhongMaterial({ color: 0x022a30, shininess: 12 }),
    abacus: new THREE.MeshPhongMaterial({ color: 0x022a30, shininess: 28 }),
    base: new THREE.MeshPhongMaterial({ color: 0x022a30, shininess: 10 }),
    gold: new THREE.MeshPhongMaterial({
      color: 0x022a30,
      shininess: 80,
      specular: 0xffe066,
    }),
    leaf: new THREE.MeshPhongMaterial({ color: 0x022a30, shininess: 8 }),
    flute: new THREE.MeshPhongMaterial({ color: 0x022a30, shininess: 5 }),
  };
}

function buildPillar(
  mats: ReturnType<typeof buildMaterials>,
  fireSpriteTex: THREE.CanvasTexture,
  skill: string,
) {
  const g = new THREE.Group();

  // — stepped base —
  const b1 = new THREE.Mesh(new THREE.BoxGeometry(1.35, 0.1, 1.35), mats.base);
  b1.position.y = 0.05;
  b1.castShadow = true;
  b1.receiveShadow = true;
  g.add(b1);
  const b2 = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.12, 1.1), mats.base);
  b2.position.y = 0.16;
  g.add(b2);

  // — shaft —
  const shaftMesh = new THREE.Mesh(
    new THREE.CylinderGeometry(0.26, 0.32, SHAFT_H, 14),
    mats.shaft,
  );
  shaftMesh.position.y = BASE_H + SHAFT_H / 2;
  shaftMesh.castShadow = true;
  g.add(shaftMesh);

  // ── SKILL TEXT ON SHAFT ───────────────────────────────────────────
  // PlaneGeometry sits just proud of the shaft surface (z = ~radius at mid).
  // MeshBasicMaterial is unaffected by scene lighting so text stays crisp.
  const textTex = makeShaftTexture(skill);
  const textPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(0.54, SHAFT_H * 0.87),
    new THREE.MeshBasicMaterial({
      map: textTex,
      transparent: true,
      depthWrite: false,
      // Slight polygon-offset so it renders above the shaft without z-fighting
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
    }),
  );
  // Place it slightly in front of the shaft face facing +Z
  textPlane.position.set(0, BASE_H + SHAFT_H / 2, 0.305);
  g.add(textPlane);

  // — fluting lines —
  for (let f = 0; f < 10; f++) {
    const a = (f / 10) * Math.PI * 2;
    const fl = new THREE.Mesh(
      new THREE.CylinderGeometry(0.018, 0.018, SHAFT_H * 0.96, 4),
      mats.flute,
    );
    fl.position.set(
      Math.cos(a) * 0.285,
      BASE_H + SHAFT_H / 2,
      Math.sin(a) * 0.285,
    );
    g.add(fl);
  }

  // — gold rings on shaft —
  [0.55, 1.55, 2.55].forEach((yo) => {
    const r = new THREE.Mesh(
      new THREE.TorusGeometry(0.295, 0.022, 8, 18),
      mats.gold,
    );
    r.rotation.x = Math.PI / 2;
    r.position.y = BASE_H + yo;
    g.add(r);
  });

  // — capital neck —
  const neck = new THREE.Mesh(
    new THREE.CylinderGeometry(0.28, 0.26, 0.09, 14),
    mats.capital,
  );
  neck.position.y = BASE_H + SHAFT_H + 0.045;
  g.add(neck);

  // — echinus (bell) —
  const echinus = new THREE.Mesh(
    new THREE.CylinderGeometry(0.5, 0.27, 0.32, 14),
    mats.capital,
  );
  echinus.position.y = BASE_H + SHAFT_H + 0.26;
  g.add(echinus);

  // — gold belt band —
  const band = new THREE.Mesh(
    new THREE.CylinderGeometry(0.5, 0.5, 0.038, 16),
    mats.gold,
  );
  band.position.y = BASE_H + SHAFT_H + 0.41;
  g.add(band);

  // — acanthus leaves (12 petals) —
  for (let l = 0; l < 12; l++) {
    const a = (l / 12) * Math.PI * 2;
    const leaf = new THREE.Mesh(
      new THREE.SphereGeometry(0.09, 6, 6),
      mats.leaf,
    );
    leaf.scale.set(0.6, 2.0, 0.6);
    leaf.position.set(
      Math.cos(a) * 0.44,
      BASE_H + SHAFT_H + 0.12,
      Math.sin(a) * 0.44,
    );
    g.add(leaf);
  }

  // — abacus (top flat plate) —
  const abacus = new THREE.Mesh(
    new THREE.BoxGeometry(1.18, 0.1, 1.18),
    mats.abacus,
  );
  abacus.position.y = BASE_H + SHAFT_H + CAPITAL_H;
  g.add(abacus);

  // ── FIRE ──────────────────────────────────────────────────────────
  const positions = new Float32Array(PARTICLE_N * 3);
  const colors = new Float32Array(PARTICLE_N * 3);
  const lifetimes = new Float32Array(PARTICLE_N);
  const velocities = new Float32Array(PARTICLE_N * 3);

  for (let i = 0; i < PARTICLE_N; i++) {
    const life = Math.random();
    lifetimes[i] = life;
    const r = Math.random() * 0.16,
      a = Math.random() * Math.PI * 2;
    positions[i * 3] = Math.cos(a) * r;
    positions[i * 3 + 1] = life * 1.1;
    positions[i * 3 + 2] = Math.sin(a) * r;
    velocities[i * 3] = (Math.random() - 0.5) * 0.009;
    velocities[i * 3 + 1] = 0.013 + Math.random() * 0.016;
    velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.009;
    colors[i * 3] = 1.0;
    colors[i * 3 + 1] = Math.min(1, life * 1.4);
    colors[i * 3 + 2] = Math.max(0, life - 0.45) * 0.55;
  }

  const fireGeo = new THREE.BufferGeometry();
  fireGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  fireGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  const fireMat = new THREE.PointsMaterial({
    size: 0.24,
    vertexColors: true,
    transparent: true,
    opacity: 0.94,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    map: fireSpriteTex,
    sizeAttenuation: true,
  });
  const firePoints = new THREE.Points(fireGeo, fireMat);
  firePoints.position.y = FIRE_Y;
  g.add(firePoints);

  return { group: g, fireGeo, lifetimes, velocities, firePoints };
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export function SkillPillars3D({ skills }: { skills: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // ── RENDERER ────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    el.appendChild(renderer.domElement);

    // ── SCENE ───────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x022a30, 0.028);

    // ── CAMERA ──────────────────────────────────────────────────────
    const W = el.clientWidth,
      H = el.clientHeight;
    const camera = new THREE.PerspectiveCamera(48, W / H, 0.1, 200);
    const CAM_R = 20;
    // Start almost head-on so text faces viewer
    let theta = 0;
    const CAM_Y = 10;
    const updateCamera = () => {
      camera.position.set(
        Math.sin(theta) * CAM_R,
        CAM_Y,
        Math.cos(theta) * CAM_R,
      );
      camera.lookAt(0, 2.5, 0);
    };
    updateCamera();

    // ── LIGHTING ────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0x7a8c50, 0.55));

    const sun = new THREE.DirectionalLight(0xfff3d0, 1.6);
    sun.position.set(10, 18, 8);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    Object.assign(sun.shadow.camera, {
      left: -22,
      right: 22,
      top: 22,
      bottom: -22,
      near: 0.5,
      far: 60,
    });
    scene.add(sun);

    const fill = new THREE.PointLight(0x4a6030, 0.6, 35);
    fill.position.set(-8, 6, -8);
    scene.add(fill);

    const fireGlow = new THREE.PointLight(0xff8c00, 1.1, 22);
    scene.add(fireGlow);

    // ── GROUND ──────────────────────────────────────────────────────
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(80, 80),
      new THREE.MeshLambertMaterial({ color: 0x022a30 }),
    );
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // ── BUILD PILLARS — all in one row along X ────────────────────
    const fireSpriteTex = makeFireSprite();
    const mats = buildMaterials();

    interface PillarData {
      group: THREE.Group;
      fireGeo: THREE.BufferGeometry;
      lifetimes: Float32Array;
      velocities: Float32Array;
    }

    const pillars: PillarData[] = [];
    const n = skills.length;

    skills.forEach((skill, idx) => {
      // Evenly spread along the X axis, centred at origin
      const x = (idx - (n - 1) / 2) * SPACING;

      const { group, fireGeo, lifetimes, velocities } = buildPillar(
        mats,
        fireSpriteTex,
        skill,
      );
      group.position.set(x, 0, 0);
      group.userData = { idx, baseX: x, baseZ: 0 };
      scene.add(group);
      pillars.push({ group, fireGeo, lifetimes, velocities });
    });

    // ── INTERACTION ──────────────────────────────────────────────────
    const ray = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let draggingScene = false;
    let draggingPillar: PillarData | null = null;
    let lastX = 0;
    const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const hitPt = new THREE.Vector3();

    const setMouse = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mouse.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      mouse.y = -((e.clientY - r.top) / r.height) * 2 + 1;
    };

    const findPillar = (obj: THREE.Object3D): PillarData | null => {
      let cur: THREE.Object3D | null = obj;
      while (cur) {
        const p = pillars.find((p) => p.group === cur);
        if (p) return p;
        cur = cur.parent;
      }
      return null;
    };

    const onDown = (e: MouseEvent) => {
      setMouse(e);
      ray.setFromCamera(mouse, camera);
      const hits = ray.intersectObjects(
        pillars.map((p) => p.group),
        true,
      );
      if (hits.length) {
        draggingPillar = findPillar(hits[0].object);
        if (draggingPillar) {
          ray.ray.intersectPlane(groundPlane, hitPt);
          renderer.domElement.style.cursor = "grabbing";
          return;
        }
      }
      draggingScene = true;
      lastX = e.clientX;
      renderer.domElement.style.cursor = "grabbing";
    };

    const onMove = (e: MouseEvent) => {
      if (draggingPillar) {
        setMouse(e);
        ray.setFromCamera(mouse, camera);
        if (ray.ray.intersectPlane(groundPlane, hitPt)) {
          draggingPillar.group.position.x = hitPt.x;
          draggingPillar.group.position.z = hitPt.z;
        }
        return;
      }
      if (!draggingScene) {
        setMouse(e);
        ray.setFromCamera(mouse, camera);
        const hits = ray.intersectObjects(
          pillars.map((p) => p.group),
          true,
        );
        renderer.domElement.style.cursor = hits.length ? "grab" : "default";
        return;
      }
      const dx = e.clientX - lastX;
      theta -= dx * 0.007;
      lastX = e.clientX;
    };

    const onUp = () => {
      draggingScene = false;
      draggingPillar = null;
      renderer.domElement.style.cursor = "default";
    };

    el.addEventListener("mousedown", onDown);
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseup", onUp);
    el.addEventListener("mouseleave", onUp);

    // ── RESIZE ───────────────────────────────────────────────────────
    const onResize = () => {
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
    };
    window.addEventListener("resize", onResize);

    // ── ANIMATION ────────────────────────────────────────────────────
    let animId: number;
    let t = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      t += 0.016;
      updateCamera();

      // fire glow pulse
      fireGlow.intensity = 0.85 + Math.sin(t * 2.8) * 0.25;
      fireGlow.position.set(Math.sin(t * 0.4) * 4, 6, Math.cos(t * 0.4) * 4);

      // update fire particles & gentle pillar bob
      pillars.forEach((p, pi) => {
        const posAttr = p.fireGeo.attributes.position as THREE.BufferAttribute;
        const colAttr = p.fireGeo.attributes.color as THREE.BufferAttribute;
        const pArr = posAttr.array as Float32Array;
        const cArr = colAttr.array as Float32Array;

        for (let i = 0; i < PARTICLE_N; i++) {
          p.lifetimes[i] += 0.018 + Math.random() * 0.012;

          if (p.lifetimes[i] >= 1.0) {
            p.lifetimes[i] = 0;
            const r = Math.random() * 0.12,
              a = Math.random() * Math.PI * 2;
            pArr[i * 3] = Math.cos(a) * r;
            pArr[i * 3 + 1] = 0;
            pArr[i * 3 + 2] = Math.sin(a) * r;
            p.velocities[i * 3] = (Math.random() - 0.5) * 0.01;
            p.velocities[i * 3 + 1] = 0.013 + Math.random() * 0.016;
            p.velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
            continue;
          }

          const life = p.lifetimes[i];
          const flick = Math.sin(t * 7 + i * 1.4 + pi * 0.7) * 0.005;
          pArr[i * 3] += p.velocities[i * 3] + flick;
          pArr[i * 3 + 1] += p.velocities[i * 3 + 1];
          pArr[i * 3 + 2] += p.velocities[i * 3 + 2] + flick;

          cArr[i * 3] = 1.0;
          cArr[i * 3 + 1] = Math.min(1, life * 1.5);
          cArr[i * 3 + 2] = Math.max(0, life - 0.42) * 0.6;
        }
        posAttr.needsUpdate = true;
        colAttr.needsUpdate = true;

        // subtle bob
        p.group.position.y = Math.sin(t * 0.55 + pi * 0.38) * 0.028;
      });

      renderer.render(scene, camera);
    };
    animate();

    // ── CLEANUP ──────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId);
      el.removeEventListener("mousedown", onDown);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseup", onUp);
      el.removeEventListener("mouseleave", onUp);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, [skills]);

  return (
    <div
      className="relative w-full h-145 rounded-2xl overflow-hidden select-none"
      style={{ background: "#022a30" }}
    >
      <div ref={containerRef} className="w-full h-full" />
      <p
        className="absolute bottom-3 right-4 text-xs opacity-40 pointer-events-none font-serif tracking-wider"
        style={{ color: "#c9a84c" }}
      >
        drag pillars · drag to orbit
      </p>
    </div>
  );
}
