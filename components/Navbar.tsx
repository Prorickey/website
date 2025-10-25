'use client';

import styles from '@/styles/navbar.module.css';
import Link from 'next/link';
import { useLayoutEffect, useState } from 'react';

export default function Navbar() {
  const [showName, setShowName] = useState(false);

  useLayoutEffect(() => {
    const onscroll = () => {
      if (window.scrollY > 5) setShowName(true);
      else setShowName(false);
    };

    window.addEventListener('scroll', onscroll);
    return () => window.removeEventListener('scroll', onscroll);
  }, []);

  return (
    <div id={"navbar"} className={'sticky top-0 z-50 w-full bg-[#171717]'}>
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
            <NavbarItem text={'About'} link={'/#about'} />
            <NavbarItem text={'Projects'} link={'/#projects'}/>
            <Link href='/blog'>Blog</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavbarItem({
  text,
  link
}: {
  text: string;
  link: string;
}) {
  return (
    <a href={link}>
      <p>{text}</p>
    </a>
  );
}
