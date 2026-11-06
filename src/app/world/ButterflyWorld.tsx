import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { LIGHT_BG, PROJECT_PALETTES, SectionKey, WORLDS } from "./worlds";

// ---------------------------------------------------------------------------
// Shaders
// ---------------------------------------------------------------------------
const NEBULA_VERT = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}`;

const NEBULA_FRAG = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform float uTime;
uniform float uAspect;
uniform float uWarp;
uniform float uSwirl;
uniform float uLight;
uniform vec2 uMouse;
uniform vec3 uA;
uniform vec3 uB;
uniform vec3 uC;
uniform vec3 uBg;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 r = mat2(0.8, -0.6, 0.6, 0.8);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = r * p * 2.02 + vec2(1.7, 9.2);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 p = (vUv - 0.5) * vec2(uAspect, 1.0) * 2.3;
  p += uMouse * 0.14;
  float ang = uWarp * length(p) * 0.7;
  p = mat2(cos(ang), -sin(ang), sin(ang), cos(ang)) * p;
  float t = uTime * (0.03 + uSwirl * 0.04);

  vec2 q = vec2(fbm(p + t), fbm(p + vec2(5.2, 1.3) - t));
  vec2 r = vec2(fbm(p + 3.0 * q + vec2(1.7, 9.2) + t * 1.5),
                fbm(p + 3.0 * q + vec2(8.3, 2.8) - t * 1.2));
  float f = fbm(p + 3.0 * r);

  vec3 col = mix(uA, uB, clamp(f * f * 3.2, 0.0, 1.0));
  col = mix(col, uC, clamp(length(q) * 0.85, 0.0, 1.0));

  // thin-film sheen laid over the densest gas
  vec3 film = 0.5 + 0.5 * cos(6.28318 * (vec3(f * 1.3 + r.x * 0.6) + vec3(0.0, 0.33, 0.67)));
  col = mix(col, film, 0.2 * smoothstep(0.4, 0.9, f));

  float density = smoothstep(0.22, 0.95, f) * 0.92 + 0.06;

  // Keep the centre column calmer than the edges so text stays readable.
  float centre = 1.0 - 0.5 * smoothstep(0.55, 0.0, abs(vUv.x - 0.5));
  vec3 dark = uBg + col * density * 0.5 * centre;
  float vig = smoothstep(1.35, 0.25, length((vUv - 0.5) * vec2(uAspect * 0.8, 1.0) * 1.7));
  dark *= mix(0.55, 1.0, vig);

  vec3 light = mix(uBg, mix(col, vec3(1.0), 0.35), density * 0.5);

  gl_FragColor = vec4(mix(dark, light, uLight), 1.0);
  gl_FragColor = linearToOutputTexel(gl_FragColor);
}`;

const WING_VERT = /* glsl */ `
varying vec2 vUv;
varying vec3 vN;
varying vec3 vV;
void main() {
  vUv = uv;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vN = normalize(normalMatrix * normal);
  vV = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}`;

const WING_FRAG = /* glsl */ `
precision highp float;
uniform vec3 uA;
uniform vec3 uB;
uniform vec3 uC;
uniform float uSeed;
uniform float uGlow;
varying vec2 vUv;
varying vec3 vN;
varying vec3 vV;
void main() {
  float fres = abs(dot(normalize(vN), normalize(vV)));
  float r = length(vUv * vec2(0.95, 1.05));
  float ang = atan(vUv.y, vUv.x);

  // thin-film interference: hue walks with view angle and position on the wing
  float band = fres * 1.8 + vUv.y * 0.55 + vUv.x * 0.7 + uSeed;
  vec3 film = 0.5 + 0.5 * cos(6.28318 * (band + vec3(0.0, 0.33, 0.67)));

  vec3 base = mix(uA, uB, smoothstep(0.05, 0.95, vUv.x + vUv.y * 0.35));
  base = mix(base, uC, smoothstep(0.1, 0.9, abs(vUv.y)));
  vec3 col = mix(base, film, 0.45);

  float vein = smoothstep(0.92, 1.0, abs(sin(ang * 9.0))) * smoothstep(0.12, 0.85, r);
  col += vein * 0.22;

  float edge = smoothstep(0.85, 1.3, r);
  col = mix(col, col * 0.16, edge * 0.9);
  float spots = step(0.9, abs(cos(ang * 7.0))) * step(0.95, r) * step(r, 1.1);
  col += spots * 0.6;

  col *= 1.0 + uGlow * 0.7;
  gl_FragColor = vec4(col, 1.0);
  gl_FragColor = linearToOutputTexel(gl_FragColor);
}`;

// ---------------------------------------------------------------------------
// Geometry helpers
// ---------------------------------------------------------------------------
function makeWingGeometry(): THREE.ShapeGeometry {
  const s = new THREE.Shape();
  s.moveTo(0, 0);
  s.bezierCurveTo(0.2, 0.55, 0.75, 0.95, 1.0, 0.72); // forewing leading edge
  s.bezierCurveTo(1.12, 0.45, 0.95, 0.12, 0.62, 0.0); // forewing trailing edge
  s.bezierCurveTo(0.9, -0.1, 0.95, -0.55, 0.6, -0.7); // hindwing outer edge
  s.bezierCurveTo(0.35, -0.8, 0.12, -0.45, 0, 0); // hindwing back to body
  return new THREE.ShapeGeometry(s, 24);
}

function makeGlowTexture(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const ctx = c.getContext("2d");
  if (ctx) {
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.25, "rgba(255,255,255,0.85)");
    g.addColorStop(0.55, "rgba(255,255,255,0.3)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);
  }
  return new THREE.CanvasTexture(c);
}

interface Flight {
  cx: number; cy: number; cz: number;
  rx: number; ry: number; rz: number;
  f1: number; f2: number; f3: number;
  p1: number; p2: number; p3: number;
}

function randomFlight(project: boolean): Flight {
  const r = (a: number, b: number) => a + Math.random() * (b - a);
  return {
    cx: r(-2.5, 2.5), cy: r(-1.5, 1.5), cz: project ? r(-0.5, 1.5) : r(-5, 2.5),
    rx: project ? r(5.5, 8) : r(4, 10), ry: project ? r(2.8, 4.2) : r(2.2, 5), rz: r(1, 3),
    f1: r(0.07, 0.16), f2: r(0.09, 0.2), f3: r(0.08, 0.18),
    p1: r(0, 6.28), p2: r(0, 6.28), p3: r(0, 6.28),
  };
}

function pathAt(f: Flight, t: number, out: THREE.Vector3) {
  out.set(
    f.cx + f.rx * Math.sin(f.f1 * t + f.p1) + 0.35 * Math.sin(f.f3 * t * 3.1 + f.p2),
    f.cy + f.ry * Math.sin(f.f2 * t + f.p2) * Math.cos(0.37 * t * f.f1 * 6 + f.p3) + 0.2 * Math.sin(t * 0.9 + f.p1),
    f.cz + f.rz * Math.sin(f.f3 * t + f.p3),
  );
}

interface Fly {
  group: THREE.Group;
  rPivot: THREE.Group;
  lPivot: THREE.Group;
  mat: THREE.ShaderMaterial;
  glow: THREE.Sprite;
  flight: Flight;
  size: number;
  scaleCur: number;
  scaleTarget: number;
  perm: number;
  flapSpeed: number;
  flapPhase: number;
  projectId: number | null;
  seek: number;
  pos: THREE.Vector3;
  prev: THREE.Vector3;
  vel: THREE.Vector3;
  caughtUntil: number;
  paletteTarget: [THREE.Color, THREE.Color, THREE.Color];
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export interface WorldFocus {
  id: number;
  /** Card centre in normalised device coordinates (-1..1). */
  x: number;
  y: number;
}

export interface CatchInfo {
  x: number;
  y: number;
  colors: string[];
}

interface ButterflyWorldProps {
  section: SectionKey;
  theme: "deep-space" | "cyber-light";
  focus: WorldFocus | null;
  projectIds: number[];
  /** Catching is disabled while a modal is open. */
  interactive: boolean;
  onCatch: (info: CatchInfo) => void;
}

const CAM_Z = 14;
const BASE_FOV = 55;
const INTERACTIVE_SELECTOR =
  "button, a, input, select, textarea, label, summary, [role='button'], [role='dialog']";

export function ButterflyWorld({ section, theme, focus, projectIds, interactive, onCatch }: ButterflyWorldProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const live = useRef({ section, theme, focus, interactive, onCatch, warp: 1 });

  useEffect(() => {
    if (live.current.section !== section) live.current.warp = 1;
    live.current.section = section;
  }, [section]);
  useEffect(() => { live.current.theme = theme; }, [theme]);
  useEffect(() => { live.current.focus = focus; }, [focus]);
  useEffect(() => { live.current.interactive = interactive; }, [interactive]);
  useEffect(() => { live.current.onCatch = onCatch; }, [onCatch]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
    } catch {
      return; // CSS gradient fallback on the container stays visible
    }

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const small = window.innerWidth < 768;
    const speed = reduced ? 0.3 : 1;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, small ? 1.5 : 1.75));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.display = "block";
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(BASE_FOV, window.innerWidth / window.innerHeight, 0.1, 120);
    camera.position.z = CAM_Z;

    const startWorld = WORLDS[live.current.section];
    const startLight = live.current.theme === "cyber-light";
    const colA = new THREE.Color(startWorld.a);
    const colB = new THREE.Color(startWorld.b);
    const colC = new THREE.Color(startWorld.c);
    const colBg = new THREE.Color(startLight ? LIGHT_BG : startWorld.bg);
    const tA = new THREE.Color();
    const tB = new THREE.Color();
    const tC = new THREE.Color();
    const tBg = new THREE.Color();

    // --- Nebula backdrop -------------------------------------------------
    const nebulaMat = new THREE.ShaderMaterial({
      vertexShader: NEBULA_VERT,
      fragmentShader: NEBULA_FRAG,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uAspect: { value: window.innerWidth / window.innerHeight },
        uWarp: { value: 1 },
        uSwirl: { value: startWorld.swirl },
        uLight: { value: startLight ? 1 : 0 },
        uMouse: { value: new THREE.Vector2() },
        uA: { value: colA },
        uB: { value: colB },
        uC: { value: colC },
        uBg: { value: colBg },
      },
    });
    const nebula = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), nebulaMat);
    nebula.renderOrder = -10;
    nebula.frustumCulled = false;
    scene.add(nebula);

    // --- Stars -----------------------------------------------------------
    const glowTex = makeGlowTexture();
    const starCount = small ? 900 : 1700;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 70;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 44;
      starPos[i * 3 + 2] = -Math.random() * 45 + 6;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.16,
      map: glowTex,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      color: new THREE.Color("#ffffff"),
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // --- Butterflies -----------------------------------------------------
    const wingGeo = makeWingGeometry();
    const bodyGeo = new THREE.CapsuleGeometry(0.035, 0.52, 4, 8);
    const bodyMat = new THREE.MeshBasicMaterial({ color: new THREE.Color("#150b24") });
    const flies: Fly[] = [];

    const makeFly = (size: number, projectId: number | null, perm: number): Fly => {
      const palette = projectId ? PROJECT_PALETTES[projectId] ?? PROJECT_PALETTES[1] : null;
      const base = palette ?? [startWorld.a, startWorld.b, startWorld.c];
      const mat = new THREE.ShaderMaterial({
        vertexShader: WING_VERT,
        fragmentShader: WING_FRAG,
        side: THREE.DoubleSide,
        uniforms: {
          uA: { value: new THREE.Color(base[perm % 3]) },
          uB: { value: new THREE.Color(base[(perm + 1) % 3]) },
          uC: { value: new THREE.Color(base[(perm + 2) % 3]) },
          uSeed: { value: Math.random() },
          uGlow: { value: 0 },
        },
      });
      const group = new THREE.Group();
      const rPivot = new THREE.Group();
      const lPivot = new THREE.Group();
      const rWing = new THREE.Mesh(wingGeo, mat);
      const lWing = new THREE.Mesh(wingGeo, mat);
      lWing.scale.x = -1;
      rPivot.add(rWing);
      lPivot.add(lWing);
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      body.position.y = 0.04;
      group.add(rPivot, lPivot, body);

      const glow = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: glowTex,
          color: new THREE.Color(base[perm % 3]),
          transparent: true,
          opacity: 0.32,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        }),
      );
      glow.scale.set(3.4, 3.4, 1);
      glow.position.y = 0.1;
      group.add(glow);

      group.visible = false;
      group.scale.setScalar(0.001);
      scene.add(group);

      return {
        group, rPivot, lPivot, mat, glow,
        flight: randomFlight(projectId !== null),
        size,
        scaleCur: 0,
        scaleTarget: 0,
        perm,
        flapSpeed: projectId ? 5.5 + Math.random() * 1.5 : 6 + Math.random() * 3.5,
        flapPhase: Math.random() * 6.28,
        projectId,
        seek: 0,
        pos: new THREE.Vector3(),
        prev: new THREE.Vector3(),
        vel: new THREE.Vector3(0, 1, 0),
        caughtUntil: 0,
        paletteTarget: [new THREE.Color(), new THREE.Color(), new THREE.Color()],
      };
    };

    const maxFlock = Math.max(...Object.values(WORLDS).map((w) => w.flock));
    const flockCap = small ? Math.ceil(maxFlock * 0.6) : maxFlock;
    for (let i = 0; i < flockCap; i++) flies.push(makeFly(0.38 + Math.random() * 0.34, null, i % 3));
    projectIds.forEach((id, i) => flies.push(makeFly(0.85, id, i % 3)));

    // --- Input -----------------------------------------------------------
    const mouse = new THREE.Vector2();
    const mouseTarget = new THREE.Vector2();
    const onMove = (e: PointerEvent) => {
      mouseTarget.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const tmpV = new THREE.Vector3();
    let elapsed = 0;
    const onDown = (e: PointerEvent) => {
      const l = live.current;
      if (!l.interactive) return;
      const target = e.target as HTMLElement | null;
      if (target?.closest?.(INTERACTIVE_SELECTOR)) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      let best: Fly | null = null;
      let bestD = Infinity;
      for (const f of flies) {
        if (f.projectId !== null || f.scaleCur < 0.6 || !f.group.visible) continue;
        tmpV.copy(f.pos).project(camera);
        const px = (tmpV.x * 0.5 + 0.5) * w;
        const py = (-tmpV.y * 0.5 + 0.5) * h;
        const d = Math.hypot(px - e.clientX, py - e.clientY);
        const radius = Math.max(40, f.size * f.scaleCur * 78);
        if (d < radius && d < bestD) {
          best = f;
          bestD = d;
        }
      }
      if (!best) return;
      best.caughtUntil = elapsed + 3;
      l.onCatch({
        x: e.clientX,
        y: e.clientY,
        colors: [best.mat.uniforms.uA.value, best.mat.uniforms.uB.value, best.mat.uniforms.uC.value].map(
          (c: THREE.Color) => `#${c.getHexString()}`,
        ),
      });
    };
    window.addEventListener("pointerdown", onDown);

    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      nebulaMat.uniforms.uAspect.value = w / h;
    };
    window.addEventListener("resize", onResize);

    // --- Loop ------------------------------------------------------------
    const basisX = new THREE.Vector3();
    const basisY = new THREE.Vector3();
    const basisZ = new THREE.Vector3();
    const basisM = new THREE.Matrix4();
    const seekTarget = new THREE.Vector3();
    const pathPos = new THREE.Vector3();
    const zAxis = new THREE.Vector3(0, 0, 1);
    const yAxis = new THREE.Vector3(0, 1, 0);

    let last = performance.now();
    let frameId = 0;
    let lastFov = BASE_FOV;
    let frameEma = 0.016;
    let ratio = renderer.getPixelRatio();

    const render = (now: number) => {
      frameId = requestAnimationFrame(render);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      // Slow GPU? Drop to 1x resolution once instead of stuttering.
      frameEma += (dt - frameEma) * 0.05;
      if (ratio > 1 && frameEma > 0.03) {
        ratio = 1;
        renderer.setPixelRatio(1);
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
      const l = live.current;
      elapsed += dt * speed;

      const world = WORLDS[l.section];
      const isLight = l.theme === "cyber-light";

      // palette cross-fade
      const k = Math.min(1, dt * 3.2);
      tA.set(world.a);
      tB.set(world.b);
      tC.set(world.c);
      tBg.set(isLight ? LIGHT_BG : world.bg);
      colA.lerp(tA, k);
      colB.lerp(tB, k);
      colC.lerp(tC, k);
      colBg.lerp(tBg, k);
      nebulaMat.uniforms.uLight.value += ((isLight ? 1 : 0) - nebulaMat.uniforms.uLight.value) * k;
      nebulaMat.uniforms.uSwirl.value += (world.swirl - nebulaMat.uniforms.uSwirl.value) * k;

      // warp burst on world change
      l.warp += (0 - l.warp) * Math.min(1, dt * (reduced ? 6 : 2.4));
      const warp = reduced ? 0 : l.warp;
      nebulaMat.uniforms.uWarp.value = warp;
      nebulaMat.uniforms.uTime.value = elapsed;
      const fov = BASE_FOV + warp * 16;
      if (Math.abs(fov - lastFov) > 0.01) {
        camera.fov = fov;
        camera.updateProjectionMatrix();
        lastFov = fov;
      }

      mouse.lerp(mouseTarget, Math.min(1, dt * 2.5));
      nebulaMat.uniforms.uMouse.value.copy(mouse);
      camera.position.x += (mouse.x * 0.7 - camera.position.x) * Math.min(1, dt * 2);
      camera.position.y += (mouse.y * 0.45 - camera.position.y) * Math.min(1, dt * 2);
      camera.lookAt(0, 0, 0);

      stars.rotation.z += dt * speed * (0.008 + warp * 0.25);
      starMat.color.copy(colA).lerp(new THREE.Color("#ffffff"), 0.6);
      starMat.blending = isLight ? THREE.NormalBlending : THREE.AdditiveBlending;
      starMat.opacity = isLight ? 0.55 : 0.85;

      // flock sizing
      const halfH = Math.tan(THREE.MathUtils.degToRad(BASE_FOV / 2)) * CAM_Z;
      const halfW = halfH * camera.aspect;
      const freeActive = small ? Math.ceil(world.flock * 0.6) : world.flock;
      const onTracklist = l.section === "04 // Tracklist";
      let freeIdx = 0;

      for (const f of flies) {
        const isProject = f.projectId !== null;
        let want = 0;
        if (isProject) want = onTracklist ? 1 : 0;
        else {
          want = freeIdx < freeActive ? 1 : 0;
          freeIdx++;
          if (elapsed < f.caughtUntil) want = 0;
          else if (f.caughtUntil > 0) {
            f.flight = randomFlight(false);
            f.caughtUntil = 0;
          }
        }
        f.scaleTarget = want;
        f.scaleCur += (f.scaleTarget - f.scaleCur) * Math.min(1, dt * 3);
        if (f.scaleCur < 0.01 && f.scaleTarget === 0) {
          f.group.visible = false;
          continue;
        }
        f.group.visible = true;

        // wing palette follows the world (project butterflies keep their own)
        if (isProject) {
          const pal = PROJECT_PALETTES[f.projectId as number] ?? PROJECT_PALETTES[1];
          f.paletteTarget[0].set(pal[f.perm % 3]);
          f.paletteTarget[1].set(pal[(f.perm + 1) % 3]);
          f.paletteTarget[2].set(pal[(f.perm + 2) % 3]);
        } else {
          const trio = [tA, tB, tC];
          f.paletteTarget[0].copy(trio[f.perm % 3]);
          f.paletteTarget[1].copy(trio[(f.perm + 1) % 3]);
          f.paletteTarget[2].copy(trio[(f.perm + 2) % 3]);
        }
        f.mat.uniforms.uA.value.lerp(f.paletteTarget[0], k);
        f.mat.uniforms.uB.value.lerp(f.paletteTarget[1], k);
        f.mat.uniforms.uC.value.lerp(f.paletteTarget[2], k);
        (f.glow.material as THREE.SpriteMaterial).color.copy(f.mat.uniforms.uA.value);

        // position: free path, or steer to the hovered project card
        pathAt(f.flight, elapsed * 6, pathPos);
        const focused = isProject && l.focus && l.focus.id === f.projectId;
        f.seek += ((focused ? 1 : 0) - f.seek) * Math.min(1, dt * 2.6);
        if (f.seek > 0.002 && l.focus) {
          seekTarget.set(
            l.focus.x * halfW + Math.cos(elapsed * 3.2) * 0.9,
            l.focus.y * halfH + Math.sin(elapsed * 4.1) * 0.7,
            1.2,
          );
          f.pos.copy(pathPos).lerp(seekTarget, f.seek);
        } else {
          f.pos.copy(pathPos);
        }

        f.vel.lerp(tmpV.copy(f.pos).sub(f.prev).divideScalar(Math.max(dt, 1e-3)), 0.12);
        f.prev.copy(f.pos);
        f.group.position.copy(f.pos);

        // orientation: body along velocity, wings turned toward the camera
        basisY.copy(f.vel);
        if (basisY.lengthSq() < 1e-6) basisY.copy(yAxis);
        basisY.normalize();
        basisZ.copy(zAxis).addScaledVector(basisY, -zAxis.dot(basisY));
        if (basisZ.lengthSq() < 1e-4) basisZ.set(0, 1, 0);
        basisZ.normalize();
        basisX.crossVectors(basisY, basisZ).normalize();
        basisM.makeBasis(basisX, basisY, basisZ);
        f.group.quaternion.setFromRotationMatrix(basisM);
        f.group.rotateY(Math.sin(elapsed * 4 + f.flapPhase) * 0.25);

        // wings
        const flapRate = f.flapSpeed * (1 + f.seek * 0.5) * (reduced ? 0.5 : 1);
        f.flapPhase += dt * flapRate;
        const flap = 0.25 + Math.abs(Math.sin(f.flapPhase)) * 1.0;
        f.rPivot.rotation.y = -flap;
        f.lPivot.rotation.y = flap;
        f.mat.uniforms.uGlow.value = f.seek * 0.8;
        (f.glow.material as THREE.SpriteMaterial).opacity = 0.28 + f.seek * 0.4;

        f.group.scale.setScalar(Math.max(0.001, f.size * f.scaleCur * (1 + f.seek * 0.35)));
      }

      renderer.render(scene, camera);
    };
    frameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("resize", onResize);
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
      flies.forEach((f) => {
        f.mat.dispose();
        (f.glow.material as THREE.SpriteMaterial).dispose();
      });
      nebula.geometry.dispose();
      nebulaMat.dispose();
      starGeo.dispose();
      starMat.dispose();
      wingGeo.dispose();
      bodyGeo.dispose();
      bodyMat.dispose();
      glowTex.dispose();
      renderer.dispose();
    };
    // The scene is built once; live values flow through the `live` ref.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="absolute inset-0 z-0 pointer-events-none"
      style={{
        background:
          "radial-gradient(ellipse at 30% 20%, rgba(var(--w-b-rgb),0.35), transparent 60%), radial-gradient(ellipse at 75% 75%, rgba(var(--w-a-rgb),0.25), transparent 55%), var(--w-bg)",
      }}
    />
  );
}
