"use client";

import { useMemo, useRef, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function ParticlesMesh() {
  const pointsRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const currentMouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const [positions, colors] = useMemo(() => {
    const count = 2000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const colorA = new THREE.Color("#6c5ce7");
    const colorB = new THREE.Color("#a29bfe");

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 10;
      positions[i3 + 1] = (Math.random() - 0.5) * 10;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;

      const t = Math.random();
      const color = colorA.clone().lerp(colorB, t);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }
    return [positions, colors];
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;

    // Smooth mouse following with lerp
    currentMouseRef.current.x +=
      (mouseRef.current.x - currentMouseRef.current.x) * 0.05;
    currentMouseRef.current.y +=
      (mouseRef.current.y - currentMouseRef.current.y) * 0.05;

    const { x, y } = currentMouseRef.current;
    const time = clock.getElapsedTime();

    // Slow rotation following mouse
    pointsRef.current.rotation.x += 0.0005 * y;
    pointsRef.current.rotation.y += 0.0005 * x;

    // Breathing / floating effect
    const breathe = 1 + Math.sin(time * 0.5) * 0.005;
    pointsRef.current.scale.setScalar(breathe);
  });

  return (
    <Points ref={pointsRef} positions={positions} colors={colors}>
      <PointMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

export default function ParticleBackground() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          style={{ background: "transparent" }}
        >
          <ParticlesMesh />
        </Canvas>
      </Suspense>
    </div>
  );
}
