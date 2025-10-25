'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';

const whoAmIText = [
  'a programmer.',
  'a designer.',
  'an engineer.',
  'a creative thinker.',
  'a student.',
  'an architect.',
  'a leader.',
];

export default function Introduction() {
  const [whoAmI, setWhoAmI] = useState('');
  const [current, setCurrent] = useState(0);
  const [wait, setWait] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
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
  }, [whoAmI, current, wait, direction]);

  return (
    <div
      id='introduction'
      className={`flex-1 w-full mb-20 py-8 px-[10%] pt-24 lg:pt-48
        bg-linear-to-b from-[#db4c4c33] to-45% to-[#171717]`}
    >
      <div className='flex flex-1 flex-col justify-center gap-x-4 lg:flex-row'>
        <div className='mx-auto w-1/3 md:w-1/4'>
          <Image
            src={'/trevor.png'}
            priority
            height={250}
            width={250}
            alt={'Portrait Picture'}
            className='aspect-square w-full rounded-full border-2 border-[#db4c4c]'
          />
          <div
            className={`flex flex-row items-center justify-center p-3`}
          >
            <div className='h-1 w-6' />
            <Image
              src={'/icons/github.svg'}
              alt={'Github'}
              width={35}
              height={35}
              className={'mr-2 hover:cursor-pointer'}
              onClick={() => window.open('https://github.com/Prorickey')}
            />
            <Image
              src={'/icons/linkedin.svg'}
              alt={'LinkedIn'}
              width={50}
              height={50}
              className={'hover:cursor-pointer'}
              onClick={() =>
                window.open('https://www.linkedin.com/in/trevor-bedson/')
              }
            />
            <div className='group relative'>
              <Image
                src='/icons/mail.png'
                alt='Email'
                width={80}
                height={80}
                className='min-w-20 min-h-20 -translate-x-3 hover:cursor-pointer'
                onClick={() => window.open('mailto:trevor@bedson.tech')}
              />
              <p className='pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 rounded bg-white px-2 py-1 text-sm text-stone-900 opacity-0 transition-opacity duration-200 group-hover:opacity-100'>
                trevor@bedson.tech
              </p>
            </div>
          </div>
        </div>
        <div className='lg:mt-10'>
          <h1 className='text-center text-6xl font-semibold lg:pl-0 lg:text-8xl xl:text-nowrap'>
            Trevor Bedson
          </h1>
          <h1 className='mt-2 text-center text-3xl lg:text-6xl'>
            i am {whoAmI}
          </h1>
        </div>
      </div>
    </div>
  );
}
