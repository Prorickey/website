'use client';

import Image from 'next/image';
import TextReveal from '@/components/ui/TextReveal';
import Magnetic from '@/components/ui/Magnetic';

const links = [
  {
    label: 'Email',
    href: 'mailto:trevor@bedson.tech',
    icon: '/icons/mail.svg',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/Prorickey',
    icon: '/icons/github.svg',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/trevor-bedson/',
    icon: '/icons/linkedin.svg',
  },
];

export function Contact() {
  return (
    <section id='contact' className='relative px-6 py-32 lg:px-10'>
      <div className='mx-auto max-w-6xl'>
        <span className='text-xs tracking-[0.4em] text-[color:var(--text-muted)] uppercase'>
          05 — Contact
        </span>

        <TextReveal
          as='h2'
          text="Let's build something."
          className='mt-6 block pb-[0.12em] text-5xl leading-[1.2] font-semibold tracking-tight md:text-7xl lg:text-[clamp(4rem,10vw,10rem)]'
          stagger={0.04}
        />

        <p className='mt-3 max-w-2xl text-lg text-[color:var(--text-muted)] lg:text-xl'>
          I&#39;m always happy to talk robotics, systems engineering, and
          building things on the web. Fastest reply is email.
        </p>

        <div className='mt-14 flex flex-wrap items-center gap-6'>
          {links.map((l) => (
            <Magnetic key={l.href} strength={0.25}>
              <a
                href={l.href}
                target={l.href.startsWith('mailto:') ? undefined : '_blank'}
                rel='noreferrer'
                className='group flex items-center gap-3 rounded-full border border-[color:var(--border-subtle)] bg-[color:var(--surface-2)] px-5 py-3 text-sm transition-colors hover:border-[color:var(--accent)]'
              >
                <Image src={l.icon} alt='' width={22} height={22} />
                <span className='tracking-wide group-hover:text-[color:var(--accent)]'>
                  {l.label}
                </span>
              </a>
            </Magnetic>
          ))}
        </div>

        <div className='mt-20 border-t border-[color:var(--border-subtle)] pt-8 text-xs tracking-[0.2em] text-[color:var(--text-muted)] uppercase'>
          <span>© {new Date().getFullYear()} Trevor Bedson</span>
        </div>
      </div>
    </section>
  );
}
