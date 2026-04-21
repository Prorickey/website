import Navbar from '@/components/Navbar';
import Hero from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { CADShowcase } from '@/components/sections/CADShowcase';
import { Toolkit } from '@/components/sections/Toolkit';
import { FeaturedProjects } from '@/components/sections/FeaturedProjects';
import { Projects } from '@/components/Projects';
import { BlogTeaser } from '@/components/sections/BlogTeaser';
import { Contact } from '@/components/sections/Contact';

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
      <Projects />
      <BlogTeaser />
      <Contact />
    </main>
  );
}
