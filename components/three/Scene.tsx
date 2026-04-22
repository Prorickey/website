'use client';

import { Canvas } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import { RobotModel } from './RobotModel';

type Props = {
  rotationY: number;
  tilt: number;
};

export default function Scene({ rotationY, tilt }: Props) {
  const [isMobile, setIsMobile] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(max-width: 767px)').matches
  );
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(mq.matches);
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const cameraZ = isMobile ? 24 : 6;

  const [canvasKey, setCanvasKey] = useState(0);

  return (
    <Canvas
      key={canvasKey}
      style={{ width: '100%', height: '100%' }}
      dpr={isMobile ? [1, 1.5] : [1, 2]}
      camera={{ position: [0, 0.6, cameraZ], fov: 32 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      onCreated={({ gl }) => {
        const canvas = gl.domElement;
        const onLost = (e: Event) => {
          e.preventDefault();
          setTimeout(() => setCanvasKey((k) => k + 1), 50);
        };
        canvas.addEventListener('webglcontextlost', onLost);
      }}
    >
      <ambientLight intensity={0.7} color='#fff2e4' />
      <directionalLight
        position={[4, 6, 4]}
        intensity={1.25}
        color='#fff0dc'
      />
      <directionalLight
        position={[-4, 2, -3]}
        intensity={0.55}
        color='#ffb59a'
      />
      <hemisphereLight args={['#fff0e0', '#1a1a1a', 0.4]} />

      <RobotModel rotationY={rotationY} tilt={tilt} />
    </Canvas>
  );
}
