'use client';

import Image from 'next/image';
import { forwardRef } from 'react';
import type { ProjectMetadata } from '@/components/Projects';

type Props = {
  project: ProjectMetadata;
  index: number;
  total: number;
  onExpand: () => void;
  revealMode?: 'scroll' | 'static';
};

export const Panel = forwardRef<HTMLElement, Props>(function Panel(
  { project, index, total, onExpand, revealMode = 'scroll' },
  ref
) {
  const numeral = `${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
  const metadata = [project.date, ...project.langs.slice(0, 4)]
    .filter(Boolean)
    .join(' · ');

  return (
    <article
      ref={ref}
      role='group'
      aria-roledescription='slide'
      aria-label={`Featured project ${index + 1} of ${total}: ${project.title}`}
      tabIndex={0}
      onClick={onExpand}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onExpand();
        }
      }}
      className='relative flex h-full w-screen shrink-0 cursor-pointer flex-col justify-between px-[8vw] py-[10vh]'
    >
      <header className='flex items-center justify-between'>
        <span className='text-xs tracking-[0.4em] text-[color:var(--text-muted)] uppercase'>
          {numeral}
        </span>
        <span className='text-xs tracking-[0.3em] text-[color:var(--accent)] uppercase'>
          Explore →
        </span>
      </header>

      <div className='flex flex-col gap-[4vh] lg:gap-[6vh]'>
        <h3
          data-panel-title
          className='text-center whitespace-nowrap will-change-[clip-path]'
          style={{
            fontSize: 'clamp(1.75rem, 5vw, 4rem)',
            lineHeight: 1,
            fontWeight: 600,
            letterSpacing: '-0.02em',
            clipPath:
              revealMode === 'static' || index === 0
                ? 'inset(0 0% 0 0%)'
                : 'inset(0 100% 0 0%)',
            transition: 'clip-path 0s',
          }}
        >
          {project.title}
        </h3>

        {project.image && (
          <div
            data-panel-image-wrap
            className='relative mx-auto aspect-video w-[75%] max-w-[42rem] overflow-hidden rounded-2xl border border-[color:var(--border-subtle)] will-change-transform'
          >
            <Image
              data-panel-image
              src={project.image}
              alt={project.title}
              fill
              sizes='(max-width: 1024px) 68vw, 42rem'
              className='object-cover'
              priority={index === 0}
            />
          </div>
        )}
      </div>

      <footer className='flex items-end justify-between gap-4'>
        <p className='max-w-xl text-[color:var(--text-primary)] lg:text-lg'>
          {project.shortDescription}
        </p>
        <span className='hidden shrink-0 text-xs tracking-[0.25em] text-[color:var(--text-muted)] uppercase md:block'>
          {metadata}
        </span>
      </footer>
    </article>
  );
});
