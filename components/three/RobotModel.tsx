'use client';

import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type { Group } from 'three';

type Props = {
  rotationY: number;
  tilt: number;
};

const BODY_URL = '/models/MainBody.glb';
const TURRET_URL = '/models/Turret.glb';

const ROBOT_SCALE = 3;
const ROBOT_POSITION: [number, number, number] = [0, -0.6, 0];
const ROBOT_REST_ROTATION: [number, number, number] = [-Math.PI / 2, 0, 0];
const TURRET_OFFSET: [number, number, number] = [-0.05, 0, 0.2];
const TURRET_SWEEP = 0.9;
const TURRET_SPEED = 0.6;
const ROTATION_LERP = 4;

export function RobotModel({ rotationY, tilt }: Props) {
  const groupRef = useRef<Group | null>(null);
  const turretRef = useRef<Group | null>(null);

  const body = useGLTF(BODY_URL);
  const turret = useGLTF(TURRET_URL);

  useFrame((_, dt) => {
    const g = groupRef.current;
    if (g) {
      const k = Math.min(1, dt * ROTATION_LERP);
      g.rotation.y += (rotationY - g.rotation.y) * k;
      g.rotation.x += (tilt - g.rotation.x) * k;
    }
    const tr = turretRef.current;
    if (tr) {
      const t = performance.now() / 1000;
      tr.rotation.z = Math.PI + Math.sin(t * TURRET_SPEED) * TURRET_SWEEP;
    }
  });

  return (
    <group
      ref={groupRef}
      position={ROBOT_POSITION}
      scale={ROBOT_SCALE}
    >
      <group rotation={ROBOT_REST_ROTATION}>
        <primitive object={body.scene} />
        <group ref={turretRef} position={TURRET_OFFSET}>
          <primitive object={turret.scene} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(BODY_URL);
useGLTF.preload(TURRET_URL);
