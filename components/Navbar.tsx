'use client';

import styles from '@/styles/navbar.module.css';
import Link from 'next/link';
import { RefObject, useEffect, useState } from 'react';

export default function Navbar({
  navbarRef,
  aboutRef,
  projectsRef,
}: {
  navbarRef: RefObject<HTMLDivElement | null> | null;
  aboutRef: RefObject<HTMLDivElement | null> | null;
  projectsRef: RefObject<HTMLDivElement | null> | null;
}) {
  const [showName, setShowName] = useState(false);
  const [navOffset, setNavOffset] = useState(0);

  const onscroll = () => {
    if (window.scrollY > 5) setShowName(true);
    else setShowName(false);
  };

  useEffect(() => {
    if (navbarRef && navbarRef.current)
      setNavOffset(navbarRef.current.getBoundingClientRect().height);
    window.addEventListener('scroll', onscroll);
    return () => window.removeEventListener('scroll', onscroll);
  }, [navOffset, navbarRef]);

  return (
    <div className={'sticky top-0 z-50 w-full bg-[#171717]'} ref={navbarRef}>
      <div
        className={
          'w-full ' +
          styles.nav +
          ' ' +
          (showName ? styles.navAdded : styles.navRemoved)
        }
      >
        <div className='flex items-center justify-between p-5 lg:pr-10'>
          <p
            className={
              'inline text-2xl font-semibold text-nowrap ' +
              (showName ? '' : 'hidden')
            }
          >
            Trevor Bedson
          </p>
          <div className='flex w-full flex-row justify-end gap-x-3 text-lg lg:gap-x-10'>
            <NavbarItem text={'About'} ref={aboutRef} link={'/#about'} />
            <NavbarItem
              text={'Projects'}
              ref={projectsRef}
              link={'/#projects'}
            />
            <Link href='/blog'>Blog</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavbarItem({
  text,
  ref,
  link,
}: {
  text: string;
  ref: RefObject<HTMLDivElement | null> | null;
  link: string;
}) {
  const actionFunc = () => {
    if (ref != null)
      window.scrollTo({
        top:
          (ref.current?.getBoundingClientRect()
            ? ref.current?.getBoundingClientRect().top
            : 0) +
          window.scrollY -
          70,
        behavior: 'smooth',
      });
    else window.location.href = link;
  };

  return (
    <button onClick={actionFunc}>
      <p>{text}</p>
    </button>
  );
}
