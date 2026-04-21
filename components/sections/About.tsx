'use client';

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';
import { ImageCarousel } from '@/components/ImageCarousel';
import styles from '@/components/About.module.css';
import TextReveal from '@/components/ui/TextReveal';

type Experience = {
  date: string;
  role: string;
  org: string;
  location?: string;
  body: string;
  tags?: string[];
};

const experiences: Experience[] = [
  {
    date: '2025 — Present',
    role: 'Captain & Lead Programmer',
    org: 'FTC 8569 RoboKnights',
    location: 'Raleigh, NC',
    body: 'Leading a 12-person team through the INTO THE DEEP season. Architecting our swerve drivetrain software, mentoring underclassmen on Java + OpenCV, and owning CAD/code integration reviews.',
    tags: ['Java', 'OpenCV', 'OnShape'],
  },
  {
    date: '2024 — 2025',
    role: 'Mobile Developer',
    org: 'North Carolina TSA',
    location: 'Remote',
    body: 'Designed and shipped the official NC TSA conference app used by thousands of students — schedules, results, push notifications. Production Expo/React Native build with a Go backend.',
    tags: ['Expo', 'React Native', 'Go'],
  },
  {
    date: '2024',
    role: 'Attaché Cohort Fellow',
    org: 'Attaché',
    body: 'Selected for a competitive summer fellowship focused on founder skills, product thinking, and systems design. Pitched a two-week build to a panel of investors and operators.',
    tags: ['Product', 'Startups'],
  },
  {
    date: '2023 — 2024',
    role: 'Full-Stack Intern',
    org: 'Lenovo Student Partner Program',
    location: 'Morrisville, NC',
    body: 'Contributed to an internal employee-tooling platform — Next.js frontend, PostgreSQL + Redis backend. Wrote the deployment pipeline that reduced release time from hours to minutes.',
    tags: ['Next.js', 'Postgres', 'Docker'],
  },
  {
    date: '2021 — 2023',
    role: 'Software Engineer',
    org: 'Independent Projects',
    body: 'Shipped Minecraft plugins and multiplayer game servers with tens of thousands of monthly players. Cut my teeth on databases, Redis pub/sub, and the realities of running something in production.',
    tags: ['Java', 'Node.js', 'Redis'],
  },
];

export function About({ age }: { age: number }) {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const labelOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.9, 1],
    [0, 1, 1, 0]
  );

  const labelRef = useRef<HTMLSpanElement | null>(null);

  useMotionValueEvent(labelOpacity, 'change', (v) => {
    if (labelRef.current) labelRef.current.style.opacity = String(v);
  });

  return (
    <section id='about' ref={ref} className='relative py-28'>
      <div className='h-[1px] w-full bg-[color:var(--accent)]/60' />

      <div className='mx-auto flex max-w-6xl flex-col gap-6 px-6 pt-16 lg:px-10'>
        <span
          ref={labelRef}
          style={{ opacity: 0 }}
          className='text-xs tracking-[0.4em] text-[color:var(--text-muted)] uppercase'
        >
          01 — About
        </span>
        <TextReveal
          as='h2'
          text='A builder, a leader, a student.'
          className='block text-4xl font-semibold text-balance lg:text-6xl'
          stagger={0.05}
        />
      </div>

      <div className='mx-auto mt-8 grid max-w-6xl grid-cols-1 gap-10 px-6 lg:grid-cols-[1fr_1fr] lg:gap-20 lg:px-10'>
        <div className='lg:sticky lg:top-28 lg:self-start'>
          <div className='text-lg leading-relaxed text-[color:var(--text-primary)] lg:text-xl'>
            <p>
              Hey there — I&#39;m a {age} year old full-stack developer with a
              bias for learning by building. I study at the{' '}
              <AccentLink href='https://ncssm.edu'>
                North Carolina School of Science and Mathematics
              </AccentLink>
              , and in my free time I ship web and mobile apps with React and
              lead two robotics teams.
            </p>
            <p className='mt-4'>
              My journey into code started with Java and Node.js, running
              Minecraft servers. That introduced me to databases and big
              codebases early. Now I build with organizations like TSA and
              DECA, and fabricate + program robots with FTC teams{' '}
              <AccentLink href='https://roboknights.net/'>
                8569 RoboKnights
              </AccentLink>{' '}
              and{' '}
              <AccentLink href='https://www.sigmacorns.org/'>
                22377 SigmaCorns
              </AccentLink>
              .
            </p>
            <div className='mt-10'>
              <Link className={styles.checkOutBlog} href='/blog'>
                <span className={styles.checkOutBlogText}>
                  Check out my Blog
                </span>
              </Link>
            </div>
          </div>
        </div>

        <Timeline items={experiences} />
      </div>

      <div className='mt-20'>
        <ImageCarousel />
      </div>
    </section>
  );
}

function Timeline({ items }: { items: Experience[] }) {
  return (
    <div className='relative lg:pb-[40vh]'>
      <div className='mb-8 flex items-baseline gap-3'>
        <span className='text-xs tracking-[0.3em] text-[color:var(--accent)] uppercase'>
          Experience
        </span>
        <span className='h-px flex-1 bg-[color:var(--border-subtle)]' />
      </div>
      <ol className='relative'>
        <div
          aria-hidden
          className='absolute top-2 bottom-2 left-[7px] w-px bg-linear-to-b from-[color:var(--border-subtle)] via-[color:var(--border-subtle)] to-transparent'
        />
        {items.map((exp, i) => (
          <TimelineItem key={`${exp.org}-${i}`} exp={exp} index={i} />
        ))}
      </ol>
    </div>
  );
}

function TimelineItem({ exp, index }: { exp: Experience; index: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        delay: Math.min(index * 0.05, 0.2),
      }}
      className='relative mb-12 pl-10 last:mb-0'
    >
      <span
        aria-hidden
        className='absolute top-2 left-0 block h-[15px] w-[15px] rounded-full border-2 border-[color:var(--accent)] bg-[color:var(--surface-1)]'
      />
      <p className='text-xs tracking-[0.25em] text-[color:var(--text-muted)] uppercase'>
        {exp.date}
        {exp.location ? ` · ${exp.location}` : ''}
      </p>
      <h3 className='mt-2 text-xl font-semibold text-[color:var(--text-primary)] lg:text-2xl'>
        {exp.role}
      </h3>
      <p className='mt-0.5 text-sm text-[color:var(--accent)]'>{exp.org}</p>
      <p className='mt-3 leading-relaxed text-[color:var(--text-muted)]'>
        {exp.body}
      </p>
      {exp.tags && exp.tags.length > 0 && (
        <ul className='mt-4 flex flex-wrap gap-2'>
          {exp.tags.map((tag) => (
            <li
              key={tag}
              className='rounded-full border border-[color:var(--border-subtle)] bg-[color:var(--surface-2)] px-2.5 py-1 text-xs text-[color:var(--text-muted)]'
            >
              {tag}
            </li>
          ))}
        </ul>
      )}
    </motion.li>
  );
}

function AccentLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
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
