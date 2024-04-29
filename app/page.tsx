'use client';
import { Canvas } from "@react-three/fiber";
import css from "./page.module.css";

export default function Home() {
  return (
    <main>
      <CrazyStuff />
      <Introduction />
    </main>
  );
}

function Introduction() {
  return (
    <div className="w-full py-36 bg-gradient-to-br from-red-500 via-orange-600 to-amber-500 
    flex flex-col">
      <p className="text-center pb-5 text-9xl font-sans font-bold tracking-wide">Trevor Bedson</p>
      <p className="text-center pt-5">test</p>
    </div>
  );
}

function CrazyStuff() {

    return (
      <div className={css.scene}>
        <Canvas
          shadows
          className={css.canvas}
          camera={{
            position: [-6, 7, 7],
          }}
        >
          <ambientLight color={"white"} intensity={0.3} />
          <Floor position={[0, -1, 0]} />
          <LightBulb position={[0, 3, 0]} />
        </Canvas>
      </div>
    );
}

function LightBulb(props: any) {
  return (
    <mesh {...props} >
      <pointLight castShadow />
      <sphereGeometry args={[0.2, 30, 10]} />
      <meshPhongMaterial emissive={"yellow"}  />
    </mesh>
  );
}

function Floor(props: any) {
  return (
    <mesh {...props} recieveShadow>
      <boxGeometry args={[20,1,10]} />
      <meshPhysicalMaterial color='white' />
    </mesh>
  );
}