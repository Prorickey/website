import { RefObject, useEffect, useState } from 'react';
import Image from 'next/image';

const whoAmIText = [
  'a programmer.',
  'a designer.',
  'an engineer.',
  'a creative thinker.',
  'a student.',
];

export default function Introduction({
  navbarRef,
}: {
  navbarRef: RefObject<HTMLDivElement | null>;
}) {
  const [introHeight, setIntroHeight] = useState(1000);
  const [whoAmI, setWhoAmI] = useState('');
  const [current, setCurrent] = useState(0);
  const [wait, setWait] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (navbarRef.current)
      setIntroHeight(window.innerHeight - navbarRef.current.clientHeight);
    else setIntroHeight(window.innerHeight);
    setTimeout(() => {
      if (direction == 0) {
        if (whoAmI.length == whoAmIText[current].length) {
          if (wait == 5) {
            setWait(0);
            setDirection(1);
          } else setWait(wait + 1);
        } else setWhoAmI(whoAmIText[current].substring(0, whoAmI.length + 1));
      } else {
        if (whoAmI.length == 0) {
          setCurrent(current == whoAmIText.length - 1 ? 0 : current + 1);
          setDirection(0);
        } else setWhoAmI(whoAmIText[current].substring(0, whoAmI.length - 1));
      }
    }, 125);
  }, [whoAmI, current, wait, direction, introHeight, navbarRef]);

  return (
    <div className='pl-36 pt-36' style={{ height: introHeight }}>
      <h1 className='text-8xl font-semibold'>Trevor Bedson</h1>
      <h1 className='pl-5 text-6xl'>i am {whoAmI}</h1>
      <button onClick={() => window.open('https://github.com/Prorickey')}>
        <div className='flex flex-row gap-x-3 pl-5 pt-10'>
          <Image src={'/github.svg'} alt={'Github'} width={35} height={35} />
          <h1 className='pt-1 text-center text-3xl'>Prorickey</h1>
        </div>
      </button>
      <div className='flex flex-row gap-x-1 pl-[0.8rem] pt-3'>
        <Image src={'/discord.svg'} alt={'Discord'} width={50} height={50} />
        <h1 className='pt-1 text-center text-3xl'>prorickey</h1>
      </div>
    </div>
  );
}
