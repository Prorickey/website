'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from '@/components/About.module.css';
import Link from 'next/link';

export function About({ age }: { age: number }) {
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    // Refresh on resize
    const handleResize = () => {
      setRefresh(!refresh);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [refresh]);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // mark as client after mount
    const timeout = setTimeout(() => setIsClient(true), 0);
    return () => clearTimeout(timeout);
  }, []);

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div id='about'>
      <div className='h-[0.1rem] w-full bg-[#db4c4c]'></div>
      <p className='w-full p-10 text-center text-5xl font-semibold'>About Me</p>
      <div className='flex w-full flex-col gap-4 lg:flex-row lg:self-center'>
        <motion.div
          whileInView='visible'
          viewport={{ once: true }}
          transition={{ ease: 'easeInOut', duration: 0.75 }}
          initial={{ opacity: 0, x: -150 }}
          variants={{
            visible: { opacity: 1, x: 0 },
            hidden: { opacity: 0, x: -150 },
          }}
          className='w-full px-5 pt-4 text-center text-xl lg:w-[40%] lg:text-left xl:w-full xl:px-20 xl:pt-20'
        >
          <p>
            Hey there! I&#39;m a {age} year old full-stack developer that has a
            passion for learning and an interest in computers. I currently study
            at the{' '}
            <span
              onClick={() => window.open('https://ncssm.edu')}
              className='cursor-pointer underline decoration-amber-500 underline-offset-2'
            >
              North Carolina School of Science and Mathematics
            </span>{' '}
            but in my free time enjoy creating websites using React and have
            been learning to program robots recently. I began my endeavours in
            programming by learning Java and nodejs to create Minecraft game
            servers and have extensive experience with databases and large
            codebases. I&#39;ve also been working on creating apps with expo and
            react-native, check out my latest app North Carolina TSA Conference
            below!
          </p>
          <div className='mt-8 flex flex-row'>
            <Link className={styles.checkOutBlog} href='/blog'>
              <span className={styles.checkOutBlogText}>Check out my Blog</span>
            </Link>
          </div>
        </motion.div>
        {isClient && windowWidth > 600 ? (
          <KnowCardsHeart />
        ) : (
          <KnowCardsNormal />
        )}
      </div>
    </div>
  );
}

function ComeFromTop({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      whileInView='visible'
      viewport={{ amount: 0.1, once: true }}
      transition={{ ease: 'easeInOut', duration: 0.75 }}
      initial={{ opacity: 0, y: 150 }}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 150 },
      }}
    >
      {children}
    </motion.div>
  );
}

function ComeFromBottom({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      whileInView='visible'
      viewport={{ amount: 0.5, once: true }}
      transition={{ ease: 'easeInOut', duration: 0.75 }}
      initial={{ opacity: 0, y: -150 }}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: -150 },
      }}
    >
      {children}
    </motion.div>
  );
}

function KnowCardsNormal() {
  return (
    <div className='flex w-[90%] flex-row gap-2 self-center px-2 py-10 md:w-3/4 lg:w-[60%] lg:gap-4 lg:px-8 lg:py-0 xl:w-full'>
      <ComeFromTop>
        <div className='flex flex-1 flex-col gap-2 py-14 lg:gap-4'>
          <KnowCard name={'HTML'} id={'html'} url={null} />
          <KnowCard name={'NextJS'} id={'nextjs'} url={'https://nextjs.org/'} />
          <KnowCard name={'Git'} id={'git'} url={'https://git-scm.com/'} />
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
          <KnowCard
            name={'SwiftUI'}
            id={'swiftui'}
            url={'https://developer.apple.com/xcode/swiftui/'}
          />
        </div>
      </ComeFromTop>
      <ComeFromBottom>
        <div className='flex flex-1 flex-col gap-2 py-14 lg:gap-4'>
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
          <KnowCard name={'Linux'} id={'linux'} url={null} />
          <KnowCard name={'Java'} id={'java'} url={'https://www.java.com/'} />
        </div>
      </ComeFromBottom>
      <ComeFromTop>
        <div className='flex flex-1 flex-col gap-2 py-14 lg:gap-4'>
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
          <KnowCard
            name={'MySQL'}
            id={'mysql'}
            url={'https://www.mysql.com/'}
          />
          <KnowCard
            name={'Typescript'}
            id={'typescript'}
            url={'https://www.typescriptlang.org/'}
          />
        </div>
      </ComeFromTop>
    </div>
  );
}

function KnowCardsHeart() {
  return (
    <div className='flex w-[90%] flex-row gap-2 self-center px-2 py-10 md:w-3/4 lg:w-[60%] lg:gap-4 lg:px-8 lg:py-0 xl:w-full'>
      <ComeFromBottom>
        <div className='flex flex-1 flex-col gap-2 py-14 lg:gap-4'>
          <KnowCard name={'HTML'} id={'html'} url={null} />
          <KnowCard name={'NextJS'} id={'nextjs'} url={'https://nextjs.org/'} />
          <KnowCard name={'Git'} id={'git'} url={'https://git-scm.com/'} />
        </div>
      </ComeFromBottom>
      <ComeFromTop>
        <div className='flex w-full flex-1 flex-col gap-2 lg:gap-4'>
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
              className='w-1/2 self-center rounded-3xl p-2'
            />
            <p className='w-full text-center text-sm lg:text-lg'>OnShape</p>
          </button>
        </div>
      </ComeFromTop>
      <ComeFromBottom>
        <div className='flex w-full flex-1 flex-col gap-2 py-14 lg:gap-4'>
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
      </ComeFromBottom>
      <ComeFromTop>
        <div className='flex w-full flex-1 flex-col gap-2 lg:gap-4'>
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
      </ComeFromTop>
      <ComeFromBottom>
        <div className='flex w-full flex-1 flex-col gap-2 py-14 lg:gap-4'>
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
      </ComeFromBottom>
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
        className='w-1/2 self-center p-2'
      />
      <p className='lg:text-md w-full text-center xl:text-lg'>{name}</p>
    </button>
  );
}
