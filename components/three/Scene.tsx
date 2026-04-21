'use client';

import { Canvas } from '@react-three/fiber';
import { RobotModel } from './RobotModel';

type Props = {
  rotationY: number;
  tilt: number;
};

export default function Scene({ rotationY, tilt }: Props) {
  return (
    <Canvas
      style={{ width: '100%', height: '100%' }}
      dpr={[1, 2]}
      camera={{ position: [0, 0.6, 6], fov: 32 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[4, 6, 4]} intensity={1.2} />
      <directionalLight position={[-4, 2, -3]} intensity={0.6} color='#db4c4c' />
      <hemisphereLight args={['#ffffff', '#222222', 0.4]} />

      <RobotModel rotationY={rotationY} tilt={tilt} />
    </Canvas>
  );
}
