'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import { RobotModel } from './RobotModel';

type Props = {
  rotationY: number;
  tilt: number;
};

export default function Scene({ rotationY, tilt }: Props) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 0.5, 5], fov: 35 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.35} />
      <directionalLight
        position={[4, 6, 4]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-4, 2, -3]} intensity={0.4} color='#db4c4c' />

      <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.35}>
        <RobotModel rotationY={rotationY} tilt={tilt} />
      </Float>

      <Environment preset='city' />
    </Canvas>
  );
}
