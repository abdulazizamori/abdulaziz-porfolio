'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function Core() {
  const core = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Group>(null);
  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime();
    if (core.current) { core.current.rotation.y = t * .18; core.current.position.x = THREE.MathUtils.lerp(core.current.position.x, pointer.x * .16, .04); core.current.position.y = THREE.MathUtils.lerp(core.current.position.y, pointer.y * .16, .04); }
    if (ring.current) ring.current.rotation.z = t * .18;
  });
  return <group ref={ring}>
    <Float speed={1.5} rotationIntensity={.45} floatIntensity={.8}>
      <mesh ref={core}><sphereGeometry args={[.98, 64, 64]} /><meshPhysicalMaterial color="#85f5df" transmission={.62} thickness={1.3} roughness={.1} metalness={.12} transparent opacity={.8} /></mesh>
      <mesh scale={.55}><sphereGeometry args={[1, 32, 32]} /><meshStandardMaterial color="#d6fff7" emissive="#82f5df" emissiveIntensity={2.4} roughness={.2} /></mesh>
      <mesh scale={1.03}><sphereGeometry args={[1, 48, 48]} /><meshBasicMaterial color="#b6fff0" wireframe transparent opacity={.08} /></mesh>
    </Float>
    <mesh rotation={[1.12, .28, 0]}><torusGeometry args={[1.42, .012, 12, 120]} /><meshBasicMaterial color="#ffc1df" transparent opacity={.68} /></mesh>
    <mesh rotation={[2.22, -.65, .4]}><torusGeometry args={[1.78, .008, 12, 120]} /><meshBasicMaterial color="#8aa7ff" transparent opacity={.55} /></mesh>
    {[[-1.38, .32, .12], [1.24, -.55, .18], [.42, 1.3, -.1]].map((position, index) => <Float key={index} speed={2 + index} floatIntensity={1.2}><mesh position={position as [number, number, number]}><octahedronGeometry args={[.075, 2]} /><meshBasicMaterial color={index === 1 ? '#ffc1df' : '#b6fff0'} /></mesh></Float>)}
  </group>;
}
export default function GravityScene() { return <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 1.5]}><ambientLight intensity={.8}/><pointLight position={[3, 2, 3]} intensity={24} color="#9cf7e8"/><pointLight position={[-3, -2, 2]} intensity={12} color="#db84ba"/><Stars radius={45} depth={18} count={520} factor={1.35} saturation={0}/><Core /></Canvas>; }
