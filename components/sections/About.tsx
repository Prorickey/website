'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';
import { ImageCarousel } from '@/components/ImageCarousel';
import styles from '@/components/About.module.css';
import TextReveal from '@/components/ui/TextReveal';

export function About({ age }: { age: number }) {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const copyY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const labelOpacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section id='about' ref={ref} className='relative py-28'>
      <div className='h-[1px] w-full bg-[color:var(--accent)]/60' />

      <div className='mx-auto flex max-w-6xl flex-col gap-6 px-6 pt-16 lg:px-10'>
        <motion.span
          style={{ opacity: labelOpacity }}
          className='text-xs tracking-[0.4em] text-[color:var(--text-muted)] uppercase'
        >
          01 — About
        </motion.span>
        <TextReveal
          as='h2'
          text='A builder, a leader, a student.'
          className='block text-balance text-4xl font-semibold lg:text-6xl'
          stagger={0.05}
        />
      </div>

      <motion.div
        style={{ y: copyY }}
        className='mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-10 px-6 lg:grid-cols-[1.3fr_1fr] lg:px-10'
      >
        <div className='text-lg leading-relaxed text-[color:var(--text-primary)] lg:text-xl'>
          <p>
            Hey there — I&#39;m a {age} year old full-stack developer with a bias
            for learning by building. I study at the{' '}
            <AccentLink href='https://ncssm.edu'>
              North Carolina School of Science and Mathematics
            </AccentLink>
            , and in my free time I ship web and mobile apps with React and lead
            two robotics teams.
          </p>
          <p className='mt-4'>
            My journey into code started with Java and Node.js, running Minecraft
            servers. That introduced me to databases and big codebases early. Now
            I build with organizations like TSA and DECA, and fabricate + program
            robots with FTC teams{' '}
            <AccentLink href='https://roboknights.net/'>8569 RoboKnights</AccentLink>
            {' '}and{' '}
            <AccentLink href='https://www.sigmacorns.org/'>22377 SigmaCorns</AccentLink>
            .
          </p>
          <div className='mt-10'>
            <Link className={styles.checkOutBlog} href='/blog'>
              <span className={styles.checkOutBlogText}>Check out my Blog</span>
            </Link>
          </div>
        </div>

        <Aside label='Currently' rows={[
          { k: 'Studying at', v: 'NCSSM' },
          { k: 'Building with', v: 'Next.js · Go · Tailwind' },
          { k: 'Leading', v: 'FTC 8569 · FTC 22377' },
        ]} />
      </motion.div>

      <div className='mt-20'>
        <ImageCarousel />
      </div>
    </section>
  );
}

function AccentLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target='_blank'
      rel='noreferrer'
      className='underline decoration-amber-500 decoration-2 underline-offset-[6px] transition-colors hover:text-[color:var(--accent)]'
    >
      {children}
    </a>
  );
}

function Aside({ label, rows }: { label: string; rows: { k: string; v: string }[] }) {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className='self-start rounded-2xl border border-[color:var(--border-subtle)] bg-[color:var(--surface-2)] p-6'
    >
      <p className='text-xs tracking-[0.3em] text-[color:var(--text-muted)] uppercase'>
        {label}
      </p>
      <dl className='mt-4 space-y-4'>
        {rows.map((r) => (
          <div key={r.k} className='flex flex-col'>
            <dt className='text-xs text-[color:var(--text-muted)]'>{r.k}</dt>
            <dd className='text-base text-[color:var(--text-primary)]'>{r.v}</dd>
          </div>
        ))}
      </dl>
    </motion.aside>
  );
}
