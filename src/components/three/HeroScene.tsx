"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  Float,
  MeshDistortMaterial,
  Icosahedron,
  Torus,
  Octahedron,
} from "@react-three/drei";
import * as THREE from "three";

/**
 * Core icosahedron: the "identity" shape — a faceted, crystalline form
 * that reacts to pointer position, distorting subtly like a liquid-crystal
 * security key.
 */
function CoreShape() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    if (!meshRef.current) return;
    const { pointer } = state;
    meshRef.current.rotation.y += 0.0025;
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      pointer.y * 0.25,
      0.03
    );
    meshRef.current.rotation.z = THREE.MathUtils.lerp(
      meshRef.current.rotation.z,
      -pointer.x * 0.15,
      0.03
    );
  });

  const scale = Math.min(1.6, viewport.width / 8);

  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.8}>
      <Icosahedron ref={meshRef} args={[1.4 * scale, 1]}>
        <MeshDistortMaterial
          color="#00E5FF"
          emissive="#0891A3"
          emissiveIntensity={0.4}
          roughness={0.15}
          metalness={0.85}
          distort={0.28}
          speed={1.8}
        />
      </Icosahedron>
    </Float>
  );
}

/** Orbiting ring — suggests a scanning / radar motif. */
function OrbitRing() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.15;
    ref.current.rotation.y += delta * 0.08;
  });

  return (
    <Torus ref={ref} args={[2.4, 0.012, 16, 100]} rotation={[Math.PI / 2.4, 0, 0]}>
      <meshBasicMaterial color="#B026FF" transparent opacity={0.5} />
    </Torus>
  );
}

/** Small satellite fragments orbiting the core — floating tech icons stand-in. */
function Fragment({
  radius,
  speed,
  size,
  color,
  offset,
}: {
  radius: number;
  speed: number;
  size: number;
  color: string;
  offset: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed + offset;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.z = Math.sin(t) * radius;
    ref.current.position.y = Math.sin(t * 1.3) * 0.4;
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.015;
  });

  return (
    <Octahedron ref={ref} args={[size, 0]}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.6}
        roughness={0.3}
        metalness={0.6}
      />
    </Octahedron>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#00E5FF" />
      <pointLight position={[-5, -3, -5]} intensity={0.8} color="#B026FF" />

      <CoreShape />
      <OrbitRing />
      <Fragment radius={2.6} speed={0.35} size={0.16} color="#39FF88" offset={0} />
      <Fragment radius={2.9} speed={0.28} size={0.12} color="#00E5FF" offset={2.1} />
      <Fragment radius={2.3} speed={0.42} size={0.14} color="#B026FF" offset={4.2} />

      <Environment preset="city" />
    </>
  );
}

/**
 * Fallback shown while the WebGL canvas mounts / on failure — keeps layout
 * stable and still on-brand (a soft glow) rather than a blank gap.
 */
function ScenePlaceholder() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-64 w-64 animate-pulse-glow rounded-full bg-cyan-glow/10 blur-3xl" />
    </div>
  );
}

/**
 * Main export: a responsive, performance-conscious React Three Fiber canvas.
 * dpr is capped to avoid melting low-end GPUs; frameloop stays "always" but
 * geometry counts are kept intentionally low (a handful of primitives) to
 * sustain 60fps even on integrated graphics.
 */
export default function HeroScene() {
  return (
    <div className="absolute inset-0 h-full w-full">
      <Suspense fallback={<ScenePlaceholder />}>
        <Canvas
          dpr={[1, 1.75]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          camera={{ position: [0, 0, 6.5], fov: 45 }}
        >
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  );
}
