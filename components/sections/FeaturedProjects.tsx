'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import type { ProjectMetadata } from '@/components/Projects';

type Props = {
  projects: ProjectMetadata[];
};

export function FeaturedProjects({ projects }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  if (projects.length === 0) return null;

  return (
    <div
      ref={ref}
      className='relative mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 lg:grid-cols-[1fr_1.2fr] lg:gap-20 lg:px-10'
      style={{ minHeight: `${projects.length * 80}vh` }}
    >
      <div className='relative lg:h-full'>
        <div className='sticky top-1/4 flex flex-col gap-6'>
          <span className='text-xs tracking-[0.4em] text-[color:var(--text-muted)] uppercase'>
            Featured Work
          </span>
          {projects.map((p, i) => (
            <Title
              key={p.slug}
              index={i}
              total={projects.length}
              project={p}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>

      <div className='flex flex-col gap-10 lg:gap-20'>
        {projects.map((p) => (
          <FeaturedCard key={p.slug} project={p} />
        ))}
      </div>
    </div>
  );
}

function Title({
  index,
  total,
  project,
  progress,
}: {
  index: number;
  total: number;
  project: ProjectMetadata;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
}) {
  const slice = 1 / total;
  const start = slice * index;
  const end = slice * (index + 1);
  const opacity = useTransform(
    progress,
    [start - slice * 0.3, start, end, end + slice * 0.3],
    [0.25, 1, 1, 0.25]
  );
  const x = useTransform(progress, [start, end], [-20, 0]);

  return (
    <motion.div style={{ opacity, x }} className='flex flex-col gap-1'>
      <span className='text-xs tracking-[0.3em] text-[color:var(--accent)] uppercase'>
        {String(index + 1).padStart(2, '0')}
      </span>
      <h3 className='text-3xl font-semibold lg:text-5xl'>{project.title}</h3>
      <p className='max-w-md text-[color:var(--text-muted)]'>
        {project.shortDescription}
      </p>
    </motion.div>
  );
}

function FeaturedCard({ project }: { project: ProjectMetadata }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className='group relative overflow-hidden rounded-3xl border border-[color:var(--border-subtle)] bg-[color:var(--surface-2)]'
    >
      {project.image && (
        <div className='relative aspect-video w-full overflow-hidden'>
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes='(max-width: 1024px) 100vw, 50vw'
            className='object-cover transition-transform duration-700 group-hover:scale-105'
          />
          <div className='pointer-events-none absolute inset-0 bg-linear-to-t from-[color:var(--surface-2)] via-transparent to-transparent' />
        </div>
      )}
      <div className='flex items-center justify-between p-6'>
        <div>
          <p className='text-sm text-[color:var(--text-muted)]'>{project.date}</p>
          <h4 className='mt-1 text-xl font-semibold'>{project.title}</h4>
        </div>
        <div className='flex gap-3'>
          {project.link && (
            <a
              href={project.link}
              target='_blank'
              rel='noreferrer'
              aria-label='Visit project'
            >
              <Image
                src='/icons/rocket.svg'
                alt=''
                width={28}
                height={28}
              />
            </a>
          )}
          {project.source && (
            <a
              href={project.source}
              target='_blank'
              rel='noreferrer'
              aria-label='View source'
            >
              <Image
                src='/icons/github.svg'
                alt=''
                width={28}
                height={28}
              />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
