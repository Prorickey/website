'use client';

import { useRef } from 'react';
import { Projects } from '@/components/Projects';
import Navbar from '@/components/Navbar';
import Introduction from '@/components/Introduction';
import { About } from '@/components/About';

export default function Home() {
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const navbarRef = useRef<HTMLDivElement | null>(null);
  const projectsRef = useRef<HTMLDivElement | null>(null);

  return (
    <main>
      <Navbar
        navbarRef={navbarRef}
        aboutRef={aboutRef}
        projectsRef={projectsRef}
      />
      <Introduction navbarRef={navbarRef} />
      <About divRef={aboutRef} />
      <Projects divRef={projectsRef} />
      <div className='h-[15rem] bg-[#171717]'></div>
    </main>
  );
}
