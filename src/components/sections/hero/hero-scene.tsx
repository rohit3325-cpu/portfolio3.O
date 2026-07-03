"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const NODE_COUNT = 46;
const CONNECT_DISTANCE = 2.4;
const RADIUS = 4.4;

function generateNetwork() {
  const positions: THREE.Vector3[] = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = RADIUS * (0.45 + Math.random() * 0.55);
    positions.push(
      new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta) * 1.25,
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi) * 0.7
      )
    );
  }

  const edges: number[] = [];
  for (let i = 0; i < positions.length; i++) {
    for (let j = i + 1; j < positions.length; j++) {
      if (positions[i].distanceTo(positions[j]) < CONNECT_DISTANCE) {
        edges.push(positions[i].x, positions[i].y, positions[i].z);
        edges.push(positions[j].x, positions[j].y, positions[j].z);
      }
    }
  }

  return { positions, edgePositions: new Float32Array(edges) };
}

// Generated once at module load (this file is only ever loaded client-side
// via a dynamic ssr:false import), not per render — keeps the network
// geometry stable across re-renders without needing useMemo.
const { positions, edgePositions } = generateNetwork();

function Network() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.InstancedMesh>(null);

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const dummy = new THREE.Object3D();
    const colorAccent = new THREE.Color("#3B82F6");
    const colorAccent2 = new THREE.Color("#8B5CF6");

    positions.forEach((pos, i) => {
      dummy.position.copy(pos);
      dummy.scale.setScalar(0.6 + Math.random() * 0.9);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      mesh.setColorAt(i, i % 4 === 0 ? colorAccent2 : colorAccent);
    });

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, []);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;
    group.rotation.y += delta * 0.045;
    const targetX = state.pointer.y * 0.18;
    const targetZ = -state.pointer.x * 0.12;
    group.rotation.x = THREE.MathUtils.damp(group.rotation.x, targetX, 4, delta);
    group.rotation.z = THREE.MathUtils.damp(group.rotation.z, targetZ, 4, delta);
  });

  return (
    <group ref={groupRef}>
      <instancedMesh ref={meshRef} args={[undefined, undefined, positions.length]}>
        <sphereGeometry args={[0.05, 10, 10]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[edgePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#3B82F6" transparent opacity={0.16} toneMapped={false} />
      </lineSegments>
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
      camera={{ position: [0, 0, 9], fov: 42 }}
    >
      <Network />
    </Canvas>
  );
}
