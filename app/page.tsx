import { Projects } from '@/components/Projects';
import Navbar from '@/components/Navbar';
import Introduction from '@/components/Introduction';
import { About } from '@/components/About';

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
      <Introduction />
      <About age={age} />
      <Projects />
      <div className='h-[15rem] bg-[#171717]'></div>
    </main>
  );
}
