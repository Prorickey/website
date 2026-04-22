'use client';

import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Color, MeshStandardMaterial, type Group, type Mesh } from 'three';

type Props = {
  rotationY: number;
  tilt: number;
};

const BODY_URL = '/models/MainBody.glb';
const TURRET_URL = '/models/Turret.glb';

const ROBOT_SCALE = 3;
const ROBOT_SCALE_MOBILE = 6;
const ROBOT_POSITION: [number, number, number] = [0, -0.6, 0];
const ROBOT_REST_ROTATION: [number, number, number] = [-Math.PI / 2, 0, 0];
const TURRET_OFFSET: [number, number, number] = [-0.05, 0, 0.2];
const TURRET_SWEEP = 0.9;
const TURRET_SPEED = 0.6;
const ROTATION_LERP = 4;

const SATURATION_BOOST = 1.9;
const LIGHTNESS_BOOST = 1.0;
const PURPLE_HUE_MIN = 0.68;
const PURPLE_HUE_MAX = 0.86;
const PURPLE_SATURATION_BOOST = 2.0;
const PURPLE_LIGHTNESS_FACTOR = 0.9;

function saturateScene(root: Group) {
  const hsl = { h: 0, s: 0, l: 0 };
  const tmp = new Color();
  root.traverse((obj) => {
    const mesh = obj as Mesh;
    if (!mesh.isMesh) return;
    const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    for (const m of mats) {
      const std = m as MeshStandardMaterial;
      if (!std || !std.color) continue;
      std.color.getHSL(hsl);
      const isPurple =
        hsl.h >= PURPLE_HUE_MIN && hsl.h <= PURPLE_HUE_MAX && hsl.s > 0.05;
      const satMul = isPurple ? PURPLE_SATURATION_BOOST : SATURATION_BOOST;
      const lightMul = isPurple ? PURPLE_LIGHTNESS_FACTOR : LIGHTNESS_BOOST;
      tmp.setHSL(
        hsl.h,
        Math.min(1, hsl.s * satMul),
        Math.max(0, Math.min(1, hsl.l * lightMul))
      );
      std.color.copy(tmp);
      std.needsUpdate = true;
    }
  });
}

export function RobotModel({ rotationY, tilt }: Props) {
  const groupRef = useRef<Group | null>(null);
  const turretRef = useRef<Group | null>(null);

  const body = useGLTF(BODY_URL);
  const turret = useGLTF(TURRET_URL);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useMemo(() => saturateScene(body.scene), [body.scene]);
  useMemo(() => saturateScene(turret.scene), [turret.scene]);

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
      scale={isMobile ? ROBOT_SCALE_MOBILE : ROBOT_SCALE}
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
