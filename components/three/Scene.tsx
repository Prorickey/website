'use client';

import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
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
      camera={{ position: [0, 0.6, 6], fov: 32 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[4, 6, 4]}
        intensity={1.4}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-4, 2, -3]} intensity={0.5} color='#db4c4c' />

      <RobotModel rotationY={rotationY} tilt={tilt} />

      <Environment preset='city' />
    </Canvas>
  );
}
