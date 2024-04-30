'use client';
import Image from 'next/image';

import './page.module.css'
import waves from './waves.svg';

export default function Home() {
  return (
    <main>
      <Introduction />
      <Image
        src={waves}
        alt="Waves"
        className="absolute w-full z-1 top-[24rem]"
      />
    </main>
  );
}

function Introduction() {
  return (
    <div className="w-full pt-36 pb-96 bg-gradient-to-b from-red-500 via-orange-600 to-amber-500 
    flex flex-col">
      <p className="inline-block text-center pb-5 text-9xl font-sans font-bold tracking-wide 
      text-stone-900">Trevor Bedson</p>
      <p className="text-center pt-5">"Banging stud"</p>
    </div>
  );
}