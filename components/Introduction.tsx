import { RefObject, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const whoAmIText = [
  'a programmer.',
  'a designer.',
  'an engineer.',
  'a creative thinker.',
  'a student.',
  'an architect.',
];

const IMAGE_SIZE = 500;

export default function Introduction({
  navbarRef,
}: {
  navbarRef: RefObject<HTMLDivElement | null>;
}) {
  const [introHeight, setIntroHeight] = useState<number | null>(1000);
  const [whoAmI, setWhoAmI] = useState('');
  const [current, setCurrent] = useState(0);
  const [wait, setWait] = useState(0);
  const [direction, setDirection] = useState(0);
  const lowestImageRef = useRef<HTMLImageElement | null>(null);

  const handleSizing = () => {
    if(window.innerWidth > 1024) {
      if (navbarRef.current) {
        const height = window.innerHeight - navbarRef.current.clientHeight;
        const lowestImageBottom = lowestImageRef.current?.getBoundingClientRect().top
        if(lowestImageBottom && lowestImageBottom + window.scrollY > height) 
          // Don't ask how I arrived at this calculation, just know it works
          setIntroHeight(lowestImageBottom + lowestImageRef.current?.getBoundingClientRect().height!/2 + window.scrollY);
        else setIntroHeight(window.innerHeight - navbarRef.current.clientHeight);
      }
      else setIntroHeight(window.innerHeight);
    } else setIntroHeight(null);
  }

  useEffect(() => {
    handleSizing();
    window.addEventListener('resize', handleSizing);
    return () => window.removeEventListener('resize', handleSizing);
  }, [handleSizing])

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
  }, [whoAmI, current, wait, direction, introHeight, navbarRef]);

  return (
    <div className='flex flex-col lg:flex-row'>
      <div
        className='pt-8 pl-5 pr-5 lg:pt-18 lg:pl-20 w-full lg:w-1/2'
        style={introHeight ? { height: introHeight } : {}}
      >
        <h1 className='pl-3 text-6xl xl:text-nowrap font-semibold lg:pl-0 lg:text-8xl'>
          Trevor Bedson
        </h1>
        <h1 className='pl-4 text-2xl md:mr-5 lg:mr-22'>Student at <span onClick={() => window.open("https://ncssm.edu")} className='underline underline-offset-2 decoration-amber-500 cursor-pointer'>North Carolina School of Science and Mathematics</span></h1>
        <h1 className='pl-5 text-3xl lg:text-6xl md:mr-5 lg:mr-10'>i am {whoAmI}</h1>
        <div className={`flex flex-row p-3 ml-1 lg:ml-0`}>
          <Image
            src={'/icons/github.svg'}
            alt={'Github'}
            width={35}
            height={35}
            className={'hover:cursor-pointer mr-2'}
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
          <div className='group relative w-fit'>
            <Image
              src='/icons/mail.png'
              alt='Email'
              width={80}
              height={80}
              className='hover:cursor-pointer -translate-x-2'
              onClick={() => window.open('mailto:trevor@bedson.tech')}
            />
            <p className='pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 rounded bg-white px-2 py-1 text-sm text-stone-900 opacity-0 transition-opacity duration-200 group-hover:opacity-100'>
              trevor@bedson.tech
            </p>
          </div>
        </div>
      </div>
      <div className='relative flex flex-col lg:flex-row gap-y-5 lg:gap-y-0 justify-start lg:justify-center align-middle w-full lg:w-1/2 mx-auto lg:m-15 pb-5 lg:pb-0'>
        <Image
          src={'/images/nctsa.png'}
          alt={'NCTSA App Team'}
          width={IMAGE_SIZE}
          height={IMAGE_SIZE}
          className='w-[90%] lg:absolute rounded-2xl object-cover lg:w-2/3 2xl:w-[60%] lg:right-10 lg:top-0 mx-auto lg:mx-0 z-20 cursor-pointer'
          onClick={() => window.open('https://apps.apple.com/us/app/north-carolina-tsa-conference/id6743861783')}
        />
        <Image
          src={'/images/smathhacks.jpg'}
          alt={'SmathHacks Action Shot'}
          width={IMAGE_SIZE}
          height={IMAGE_SIZE}
          className='w-[90%] lg:absolute rounded-2xl object-cover lg:w-2/3 2xl:w-[60%] lg:top-[15rem] lg:left-0 mx-auto lg:mx-0 z-10 lg:-translate-x-1/3 2xl:top-[18rem] cursor-pointer'
          onClick={() => window.open('https://devpost.com/software/ares-udeksp')}
        />
        <Image
          src={'/images/robotics.jpeg'}
          alt={'Robotics Action Shot'}
          width={IMAGE_SIZE}
          height={IMAGE_SIZE}
          ref={lowestImageRef}
          className='w-[90%] lg:absolute rounded-2xl object-cover lg:w-2/3 top-[27rem] 2xl:w-[60%] 2xl:top-[32rem] right-0 mx-auto lg:mx-0 cursor-pointer'
          onClick={() => window.open('https://www.instagram.com/roboknights8569/')}
        />
      </div>
    </div>
  );
}
