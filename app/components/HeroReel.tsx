'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Image, MeshReflectorMaterial, Stars } from '@react-three/drei';
import { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

export type ReelItem = { src: string; slug: string; name: string; kind: string };

type ReelProps = {
  items: ReelItem[];
  onFrontChange: (index: number) => void;
  onOpen: (slug: string) => void;
  onReady: () => void;
  rtl?: boolean;
};

type Palette = { sky: string; sea: string; night: boolean };

const TAU = Math.PI * 2;
const CARD_W = .95;
const CARD_H = CARD_W * 16 / 9;
const WATER_Y = -1.3;

/** Horizontal position of the ring: beside the copy on wide screens, centred above it on narrow ones. */
function ringOffset(viewportWidth: number, narrow: boolean, rtl = false) {
  return narrow ? 0 : Math.min(viewportWidth * .255, 3.4) * (rtl ? -1 : 1);
}

/** Wraps an angle into the range (-PI, PI]. */
function wrap(angle: number) {
  return Math.atan2(Math.sin(angle), Math.cos(angle));
}

/** Reads the scene colours from the page's theme tokens, and follows theme changes. */
function usePalette(): Palette | null {
  const [palette, setPalette] = useState<Palette | null>(null);
  useEffect(() => {
    const read = () => {
      const style = getComputedStyle(document.documentElement);
      const token = (name: string) => style.getPropertyValue(name).trim();
      setPalette({ sky: token('--scene-sky'), sea: token('--scene-sea'), night: token('--scene-night') === '1' });
    };
    read();
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    query.addEventListener('change', read);
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => { query.removeEventListener('change', read); observer.disconnect(); };
  }, []);
  return palette;
}

function scrollProgress() {
  return typeof window === 'undefined' ? 0 : Math.min(window.scrollY / window.innerHeight, 1.2);
}

/** Tileable value noise, used to ripple the reflection so the sea never looks like glass. */
function rippleTexture() {
  const size = 128;
  const grid = 8;
  const seeds = Array.from({ length: grid * grid }, () => Math.random());
  const at = (x: number, y: number) => seeds[((y + grid) % grid) * grid + ((x + grid) % grid)];
  const data = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const gx = (x / size) * grid; const gy = (y / size) * grid;
      const x0 = Math.floor(gx); const y0 = Math.floor(gy);
      const fx = THREE.MathUtils.smootherstep(gx - x0, 0, 1); const fy = THREE.MathUtils.smootherstep(gy - y0, 0, 1);
      const top = THREE.MathUtils.lerp(at(x0, y0), at(x0 + 1, y0), fx);
      const bottom = THREE.MathUtils.lerp(at(x0, y0 + 1), at(x0 + 1, y0 + 1), fx);
      const value = THREE.MathUtils.lerp(top, bottom, fy) * 255;
      data.set([value, value, value, 255], (y * size + x) * 4);
    }
  }
  const texture = new THREE.DataTexture(data, size, size);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(10, 40);
  texture.needsUpdate = true;
  return texture;
}

/** The sea: a rippling, blurred mirror that reflects the ring and fades into the sky through fog. */
function Sea({ color, narrow, reduced }: { color: string; narrow: boolean; reduced: React.MutableRefObject<boolean> }) {
  const ripples = useMemo(rippleTexture, []);
  useEffect(() => () => ripples.dispose(), [ripples]);
  useFrame((_, delta) => {
    if (!reduced.current) ripples.offset.y += delta * .012;
  });
  return <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, WATER_Y, -100]}>
    <planeGeometry args={[600, 600]}/>
    <MeshReflectorMaterial
      color={color}
      blur={[300, 60]}
      resolution={narrow ? 256 : 512}
      mixBlur={.8}
      mixStrength={narrow ? 5 : 7}
      mirror={.8}
      roughness={1}
      depthScale={1.2}
      minDepthThreshold={.4}
      maxDepthThreshold={1.4}
      metalness={.2}
      emissive={color}
      emissiveIntensity={.55}
      distortionMap={ripples}
      distortion={.35}
    />
  </mesh>;
}

function Card({ item, angle, radius, index, spin, hovered, setHovered, open }: {
  item: ReelItem;
  angle: number;
  radius: number;
  index: number;
  spin: React.MutableRefObject<number>;
  hovered: React.MutableRefObject<number>;
  setHovered: (index: number) => void;
  open: (slug: string) => void;
}) {
  const ref = useRef<THREE.Mesh>(null);

  // Bend the plane slightly so each screen reads as a curved panel on the ring.
  useLayoutEffect(() => {
    const geometry = ref.current?.geometry;
    if (!geometry) return;
    const position = geometry.attributes.position;
    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i) * CARD_W;
      position.setZ(i, -(x * x) * .12);
    }
    position.needsUpdate = true;
    geometry.computeBoundingSphere();
  }, []);

  useFrame((_, delta) => {
    const mesh = ref.current;
    if (!mesh) return;
    const facing = Math.cos(wrap(angle + spin.current));
    const lift = hovered.current === index ? .34 : 0;
    const out = radius + lift;
    mesh.position.set(Math.sin(angle) * out, 0, Math.cos(angle) * out);
    const material = mesh.material as THREE.ShaderMaterial & { opacity: number; grayscale: number };
    const visibility = THREE.MathUtils.smoothstep(facing, -.55, .85);
    // Screens turned away fade almost out, so their mirrored backs never read as text.
    material.opacity = THREE.MathUtils.damp(material.opacity, .05 + visibility * .95, 8, delta);
    material.grayscale = THREE.MathUtils.damp(material.grayscale, hovered.current === index ? 0 : 1 - visibility, 8, delta);
    const scale = THREE.MathUtils.damp(mesh.scale.x / CARD_W, hovered.current === index ? 1.06 : 1, 10, delta);
    mesh.scale.set(CARD_W * scale, CARD_H * scale, 1);
  });

  return <Image
    ref={ref}
    url={item.src}
    scale={[CARD_W, CARD_H]}
    segments={12}
    radius={.07}
    transparent
    side={THREE.DoubleSide}
    rotation={[0, angle, 0]}
    onPointerOver={event => { event.stopPropagation(); setHovered(index); }}
    onPointerOut={() => setHovered(-1)}
    onClick={event => { event.stopPropagation(); open(item.slug); }}
  />;
}

function Ring({ items, onFrontChange, onOpen, onReady, rtl, interaction }: ReelProps & {
  interaction: React.MutableRefObject<{ velocity: number; dragging: boolean; moved: number; reduced: boolean }>;
}) {
  const group = useRef<THREE.Group>(null);
  const spin = useRef(0);
  const hovered = useRef(-1);
  const front = useRef(-1);
  const { viewport, size, gl } = useThree();
  const narrow = size.width < 820;
  const radius = 2.35;
  const angles = useMemo(() => items.map((_, index) => (index / items.length) * TAU), [items]);

  useEffect(() => { onReady(); }, [onReady]);

  const setHovered = (index: number) => {
    hovered.current = index;
    gl.domElement.style.cursor = index >= 0 ? 'pointer' : '';
  };

  const open = (slug: string) => {
    if (interaction.current.moved > 6) return;
    gl.domElement.style.cursor = '';
    onOpen(slug);
  };

  useFrame(({ pointer }, delta) => {
    const state = interaction.current;
    const scroll = scrollProgress();
    const idle = state.reduced || hovered.current >= 0 ? 0 : -.075;
    if (!state.dragging) state.velocity = THREE.MathUtils.damp(state.velocity, idle, 2.2, delta);
    spin.current += state.velocity * delta;

    const g = group.current;
    if (g) {
      g.rotation.y = spin.current + scroll * 1.1;
      const tiltX = .1 + (state.reduced ? 0 : pointer.y * -.06);
      const tiltZ = -.06 + (state.reduced ? 0 : pointer.x * .04);
      g.rotation.x = THREE.MathUtils.damp(g.rotation.x, tiltX, 3, delta);
      g.rotation.z = THREE.MathUtils.damp(g.rotation.z, tiltZ, 3, delta);
      // The ring floats just above the water and bobs gently, like a sculpture standing in the sea.
      const bob = state.reduced ? 0 : Math.sin(performance.now() / 1400) * .04;
      g.position.set(ringOffset(viewport.width, narrow, rtl), .05 + bob, narrow ? -.4 : -1.4);
    }

    // Report which screen currently faces the viewer so the page caption can follow it.
    let best = 0; let bestFacing = -Infinity;
    const total = spin.current + scroll * 1.1;
    angles.forEach((angle, index) => {
      const facing = Math.cos(wrap(angle + total));
      if (facing > bestFacing) { bestFacing = facing; best = index; }
    });
    if (best !== front.current) { front.current = best; onFrontChange(best); }
  });

  return <group ref={group}>
    {items.map((item, index) => <Card key={item.src} item={item} angle={angles[index]} radius={radius} index={index} spin={spin} hovered={hovered} setHovered={setHovered} open={open}/>)}
  </group>;
}

export default function HeroReel(props: ReelProps) {
  const wrapper = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [narrow, setNarrow] = useState(false);
  const palette = usePalette();
  const interaction = useRef({ velocity: -.6, dragging: false, moved: 0, reduced: false });
  const reduced = useRef(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      interaction.current.reduced = query.matches;
      reduced.current = query.matches;
      if (query.matches) interaction.current.velocity = 0;
    };
    sync();
    query.addEventListener('change', sync);
    const resize = () => setNarrow(window.innerWidth < 820);
    resize();
    window.addEventListener('resize', resize);
    const element = wrapper.current;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (element) observer.observe(element);
    return () => { query.removeEventListener('change', sync); window.removeEventListener('resize', resize); observer.disconnect(); };
  }, []);

  // Horizontal drag spins the ring; vertical movement is left to page scrolling.
  useEffect(() => {
    const element = wrapper.current;
    if (!element) return;
    let lastX = 0; let lastTime = 0;
    const down = (event: PointerEvent) => {
      interaction.current.dragging = true; interaction.current.moved = 0;
      lastX = event.clientX; lastTime = performance.now();
    };
    const move = (event: PointerEvent) => {
      if (!interaction.current.dragging) return;
      const now = performance.now();
      const dx = event.clientX - lastX;
      const dt = Math.max(now - lastTime, 8) / 1000;
      interaction.current.moved += Math.abs(dx);
      interaction.current.velocity = THREE.MathUtils.clamp((dx / dt) * .0032, -4, 4);
      lastX = event.clientX; lastTime = now;
    };
    const up = () => { interaction.current.dragging = false; };
    element.addEventListener('pointerdown', down);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
    return () => {
      element.removeEventListener('pointerdown', down);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
    };
  }, []);

  return <div ref={wrapper} className="reel-canvas" aria-hidden="true">
    {palette && <Canvas camera={{ position: [0, 1.15, 9.5], fov: 34 }} onCreated={({ camera }) => camera.lookAt(0, .15, 0)} dpr={[1, narrow ? 1.5 : 2]} frameloop={visible ? 'always' : 'never'} gl={{ antialias: true, alpha: true }}>
      <fog key={palette.sky} attach="fog" args={[palette.sky, 18, 150]}/>
      <ambientLight intensity={1.4}/>
      <directionalLight position={[2, 6, -10]} intensity={1.2}/>
      {palette.night && <Stars radius={120} depth={40} count={narrow ? 900 : 1800} factor={3} saturation={0} fade speed={reduced.current ? 0 : .4}/>}
      <Suspense fallback={null}>
        <Ring {...props} interaction={interaction}/>
        <Sea color={palette.sea} narrow={narrow} reduced={reduced}/>
      </Suspense>
    </Canvas>}
  </div>;
}
