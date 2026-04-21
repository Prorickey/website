import Navbar from '@/components/Navbar';
import Hero from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { CADShowcase } from '@/components/sections/CADShowcase';
import { Toolkit } from '@/components/sections/Toolkit';
import { Projects } from '@/components/Projects';

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
      <Projects />
      <div className='h-60 bg-[color:var(--background)]'></div>
    </main>
  );
}
