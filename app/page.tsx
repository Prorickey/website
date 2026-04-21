import Navbar from '@/components/Navbar';
import Hero from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { CADShowcase } from '@/components/sections/CADShowcase';
import { Toolkit } from '@/components/sections/Toolkit';
import { FeaturedProjects } from '@/components/sections/FeaturedProjects';
import { Projects } from '@/components/Projects';
import { BlogTeaser } from '@/components/sections/BlogTeaser';
import { Contact } from '@/components/sections/Contact';
import LiquidBlack from '@/components/react-bits/LiquidBlack';

export default function Home() {
  const today = new Date();
  const birthDate = new Date(2008, 2, 13);
  let age = today.getFullYear() - birthDate.getFullYear();
  if (
    today.getMonth() < birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() < birthDate.getDate())
  )
    age--;

  return (
    <main>
      <Navbar />
      <Hero />
      <About age={age} />
      <CADShowcase />
      <Toolkit />
      <FeaturedProjects />

      <div className='relative'>
        <div className='pointer-events-none absolute inset-0 z-0'>
          <LiquidBlack />
        </div>
        <div className='relative z-10'>
          <Projects />
          <BlogTeaser />
          <Contact />
        </div>
      </div>
    </main>
  );
}
