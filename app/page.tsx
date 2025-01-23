'use client';

import { useRef } from 'react';
import Navbar from '@/app/navbar';
import AboutMe from '@/app/about';
import Introduction from '@/app/intro';
import Projects from '@/app/projects';

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
      <AboutMe divRef={aboutRef} />
      <Projects divRef={projectsRef} />
      <div className='h-[15rem] bg-[#171717]'></div>
    </main>
  );
}
