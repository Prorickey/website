'use client';

import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type { Group } from 'three';

type Props = {
  rotationY: number;
  tilt: number;
};

export function RobotModel({ rotationY, tilt }: Props) {
  const groupRef = useRef<Group | null>(null);
  const armRef = useRef<Group | null>(null);
  const headRef = useRef<Group | null>(null);

  useFrame((_, dt) => {
    if (!groupRef.current) return;
    const g = groupRef.current;
    g.rotation.y += (rotationY - g.rotation.y) * Math.min(1, dt * 4);
    g.rotation.x += (tilt - g.rotation.x) * Math.min(1, dt * 4);

    const t = performance.now() / 1000;
    if (armRef.current) armRef.current.rotation.x = Math.sin(t * 1.4) * 0.25 - 0.35;
    if (headRef.current) headRef.current.rotation.y = Math.sin(t * 0.8) * 0.35;
  });

  return (
    <group ref={groupRef} position={[0, -0.6, 0]}>
      <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.8, 1.2, 1.4]} />
        <meshStandardMaterial color='#2b2b2b' metalness={0.7} roughness={0.3} />
      </mesh>

      <mesh position={[0, -0.7, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.1, 0.25, 1.6]} />
        <meshStandardMaterial color='#db4c4c' metalness={0.4} roughness={0.4} />
      </mesh>

      {[-0.9, 0.9].map((x) => (
        <mesh key={x} position={[x, -0.95, 0]} castShadow>
          <cylinderGeometry args={[0.2, 0.2, 0.3, 24]} />
          <meshStandardMaterial color='#111111' roughness={0.8} />
        </mesh>
      ))}

      <group ref={armRef} position={[0, 0.5, 0.4]}>
        <mesh position={[0, 0.4, 0]} castShadow>
          <boxGeometry args={[0.3, 1.0, 0.3]} />
          <meshStandardMaterial color='#888888' metalness={0.8} roughness={0.25} />
        </mesh>
        <mesh position={[0, 0.9, 0]} castShadow>
          <boxGeometry args={[0.5, 0.2, 0.5]} />
          <meshStandardMaterial color='#db4c4c' metalness={0.4} roughness={0.4} />
        </mesh>
      </group>

      <group ref={headRef} position={[0, 0.95, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.9, 0.5, 0.9]} />
          <meshStandardMaterial color='#1a1a1a' metalness={0.6} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0, 0.46]}>
          <planeGeometry args={[0.6, 0.2]} />
          <meshStandardMaterial
            color='#db4c4c'
            emissive='#db4c4c'
            emissiveIntensity={1.2}
            toneMapped={false}
          />
        </mesh>
      </group>
    </group>
  );
}
