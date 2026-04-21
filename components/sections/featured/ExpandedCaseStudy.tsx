'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import type { ProjectMetadata } from '@/components/Projects';
import { useProjectDescription } from '@/hooks/useProjectDescription';
import { LanguageIcons } from '@/components/projects/LanguageIcons';

type Props = {
  project: ProjectMetadata;
  langlinks: Record<string, string>;
  onClose: () => void;
};

export function ExpandedCaseStudy({ project, langlinks, onClose }: Props) {
  const description = useProjectDescription(project.slug);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className='absolute inset-0 z-20 flex items-center justify-center bg-[color:var(--background)]/85 p-4 backdrop-blur-md'
      onClick={onClose}
    >
      <motion.article
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 16 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className='relative max-h-[88vh] w-full max-w-5xl overflow-y-auto rounded-3xl border border-[color:var(--border-subtle)] bg-[color:var(--surface-2)] p-6 lg:p-10'
      >
        <header className='flex items-start justify-between gap-4'>
          <div>
            <p className='text-xs tracking-[0.3em] text-[color:var(--text-muted)] uppercase'>
              {project.date}
            </p>
            <h2 className='mt-2 text-3xl font-semibold lg:text-5xl'>
              {project.title}
            </h2>
          </div>
          <div className='flex shrink-0 items-center gap-3'>
            {project.link && (
              <button
                aria-label='Visit project'
                onClick={() => window.open(project.link!, '_blank')}
              >
                <Image
                  src='/icons/rocket.svg'
                  alt=''
                  width={28}
                  height={28}
                />
              </button>
            )}
            {project.source && (
              <button
                aria-label='View source'
                onClick={() => window.open(project.source!, '_blank')}
              >
                <Image
                  src='/icons/github.svg'
                  alt=''
                  width={28}
                  height={28}
                />
              </button>
            )}
            <button
              aria-label='Close'
              onClick={onClose}
              className='ml-2 rounded-lg p-1 text-[color:var(--text-muted)] transition-colors hover:bg-white/10 hover:text-[color:var(--text-primary)]'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <line x1='18' y1='6' x2='6' y2='18' />
                <line x1='6' y1='6' x2='18' y2='18' />
              </svg>
            </button>
          </div>
        </header>

        <div className='mt-6 grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:gap-10'>
          {project.image && (
            <div className='relative aspect-video w-full overflow-hidden rounded-2xl'>
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes='(max-width: 1024px) 100vw, 600px'
                className='object-cover'
              />
            </div>
          )}
          <div className='flex flex-col gap-4'>
            <p className='text-[color:var(--text-primary)] lg:text-lg'>
              {project.shortDescription}
            </p>
            <p className='leading-relaxed whitespace-pre-wrap text-[color:var(--text-muted)]'>
              {description ?? 'Loading…'}
            </p>
          </div>
        </div>

        <LanguageIcons
          langs={project.langs}
          langlinks={langlinks}
          columns={8}
          className='mt-8'
        />
      </motion.article>
    </motion.div>
  );
}
