import Image from 'next/image';
import { RefObject } from 'react';

const today = new Date();
const birthDate = new Date(2008, 2, 13);
let age = today.getFullYear() - birthDate.getFullYear();
if (
  today.getMonth() < birthDate.getMonth() ||
  (today.getMonth() === birthDate.getMonth() &&
    today.getDate() < birthDate.getDate())
)
  age--;

export default function AboutMe({
  divRef,
}: {
  divRef: RefObject<HTMLDivElement | null>;
}) {
  return (
    <div ref={divRef}>
      <div className='h-[0.1rem] w-full bg-[#db4c4c]'></div>
      <p className='w-full p-10 text-center text-5xl font-semibold'>About Me</p>
      <div className='flex w-full lg:self-center flex-col gap-4 lg:flex-row'>
        <div className='w-full lg:w-[40%] xl:w-full px-5 pt-4 text-center text-xl xl:px-20 xl:pt-20 lg:text-left'>
          <p>
            Hey there! I&#39;m a {age} year old full-stack developer that has a
            passion for learning and an interest in computers. I enjoy creating
            websites using React and have been learning to program robots
            recently. I began my endeavours in programming by learning Java and
            nodejs to create Minecraft game servers and have extensive
            experience with databases and large codebases. I have taken up an
            interest in machine learning and hope to pursue that passion.
          </p>
        </div>
        <div className='flex w-[90%] md:w-3/4 lg:w-[60%] xl:w-full flex-row gap-2 px-2 lg:px-8 py-10 lg:gap-4 lg:py-0 self-center'>
          <div className='flex flex-1 flex-col gap-2 py-14 lg:gap-4'>
            <KnowCard name={'HTML'} id={'html'} url={null} />
            <KnowCard name={'NextJS'} id={'nextjs'} url={'https://nextjs.org/'} />
            <KnowCard name={'Git'} id={'git'} url={'https://git-scm.com/'} />
          </div>
          <div className='flex flex-1 w-1/5 flex-col gap-2 lg:gap-4'>
            <KnowCard name={'CSS'} id={'css'} url={null} />
            <KnowCard
              name={'Tailwind'}
              id={'tailwindcss'}
              url={'https://tailwindcss.com/'}
            />
            <KnowCard name={'Redis'} id={'redis'} url={'https://redis.io/'} />
            <KnowCard
              name={'Kubernetes'}
              id={'kubernetes'}
              url={'https://kubernetes.io/'}
            />
            <button
              className='flex flex-col rounded-lg border-2 border-[#db4c4c]'
              onClick={() => window.open('https://www.onshape.com/')}
            >
              <Image
                src={`/knows/onshape.png`}
                alt={'nextjs'}
                width={75}
                height={75}
                className='self-center rounded-3xl p-2 sm:w-1/2'
              />
              <p className='w-full text-center text-sm lg:text-lg'>OnShape</p>
            </button>
          </div>
          <div className='flex flex-1 w-full flex-col gap-2 py-14 lg:gap-4'>
            <KnowCard name={'Golang'} id={'golang'} url={'https://go.dev/'} />
            <KnowCard name={'Javascript'} id={'javascript'} url={null} />
            <KnowCard
              name={'Node.js'}
              id={'nodejs'}
              url={'https://nodejs.org/'}
            />
            <KnowCard
              name={'MongoDB'}
              id={'mongodb'}
              url={'https://www.mongodb.com/'}
            />
            <KnowCard
              name={'Docker'}
              id={'docker'}
              url={'https://www.docker.com/'}
            />
          </div>
          <div className='flex flex-1 w-full flex-col gap-2 lg:gap-4'>
            <KnowCard
              name={'Typescript'}
              id={'typescript'}
              url={'https://www.typescriptlang.org/'}
            />
            <KnowCard name={'Java'} id={'java'} url={'https://www.java.com/'} />
            <KnowCard
              name={'MySQL'}
              id={'mysql'}
              url={'https://www.mysql.com/'}
            />
            <KnowCard name={'Linux'} id={'linux'} url={null} />
            <KnowCard
              name={'SwiftUI'}
              id={'swiftui'}
              url={'https://developer.apple.com/xcode/swiftui/'}
            />
          </div>
          <div className='flex flex-1 w-full flex-col gap-2 py-14 lg:gap-4'>
            <KnowCard name={'React'} id={'react'} url={'https://react.dev/'} />
            <KnowCard
              name={'Python'}
              id={'python'}
              url={'https://www.python.org/'}
            />
            <KnowCard
              name={'Postgresql'}
              id={'postgresql'}
              url={'https://www.postgresql.org/'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function KnowCard({
  name,
  id,
  url,
}: {
  name: string;
  id: string;
  url: string | null;
}) {
  return (
    <button
      className='flex flex-col rounded-lg border-2 border-[#db4c4c]'
      onClick={url ? () => window.open(url) : undefined}
      style={{ pointerEvents: url ? 'auto' : 'none' }}
    >
      <Image
        src={`/knows/${id}.svg`}
        alt={id}
        width={75}
        height={75}
        className='self-center p-2 w-1/2'
      />
      <p className='w-full text-center lg:text-md xl:text-lg'>{name}</p>
    </button>
  );
}
