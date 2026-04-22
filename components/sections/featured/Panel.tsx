'use client';

import Image from 'next/image';
import { forwardRef } from 'react';
import type { ProjectMetadata } from '@/components/Projects';
import { LanguageIcons } from '@/components/projects/LanguageIcons';

type Props = {
  project: ProjectMetadata;
  index: number;
  total: number;
  onExpand: () => void;
  revealMode?: 'scroll' | 'static';
  langlinks?: Record<string, string>;
};

export const Panel = forwardRef<HTMLElement, Props>(function Panel(
  { project, index, total, onExpand, revealMode = 'scroll', langlinks = {} },
  ref
) {
  const numeral = `${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;

  const stopPropagation = (e: React.MouseEvent | React.KeyboardEvent) =>
    e.stopPropagation();

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
      className='relative flex h-full w-screen shrink-0 cursor-pointer flex-col justify-between px-[8vw] py-[3vh] md:py-[10vh]'
    >
      <header className='flex items-center justify-between'>
        <span className='text-xs tracking-[0.4em] text-[color:var(--text-muted)] uppercase'>
          {numeral}
        </span>
        <span className='text-xs tracking-[0.3em] text-[color:var(--accent)] uppercase'>
          Explore →
        </span>
      </header>

      <div className='flex flex-col gap-[4vh] lg:gap-[5vh]'>
        <h3
          data-panel-title
          className='text-center text-balance whitespace-normal will-change-[clip-path] md:whitespace-nowrap'
          style={{
            fontSize: 'clamp(1.75rem, 5vw, 4rem)',
            lineHeight: 1.25,
            fontWeight: 600,
            letterSpacing: '-0.02em',
            padding: '0.05em 0.02em',
            clipPath:
              revealMode === 'static' || index === 0
                ? 'inset(0 0% 0 0%)'
                : 'inset(0 100% 0 0%)',
            transition: 'clip-path 0s',
          }}
        >
          {project.title}
        </h3>

        <div className='grid grid-cols-1 items-center gap-8 md:grid-cols-[1.1fr_1fr] md:gap-10 lg:gap-14'>
          {project.image && (
            <div
              data-panel-image-wrap
              className='relative aspect-video w-full overflow-hidden rounded-2xl border border-[color:var(--border-subtle)] will-change-transform'
            >
              <Image
                data-panel-image
                src={project.image}
                alt={project.title}
                fill
                sizes='(max-width: 768px) 84vw, (max-width: 1280px) 45vw, 40rem'
                className='object-cover'
                priority={index === 0}
              />
            </div>
          )}

          <div className='flex flex-col gap-4 rounded-2xl border border-[color:var(--border-subtle)] bg-[color:var(--surface-2)]/60 p-6 backdrop-blur-sm lg:p-7'>
            <p className='text-[color:var(--text-primary)] lg:text-lg'>
              {project.shortDescription}
            </p>

            {project.langs.length > 0 && (
              <LanguageIcons
                langs={project.langs}
                langlinks={langlinks}
                columns={6}
                iconSize={32}
                stopPropagation
              />
            )}

            <div className='flex items-center justify-between gap-4 border-t border-[color:var(--border-subtle)] pt-4'>
              <span className='text-xs tracking-[0.25em] text-[color:var(--text-muted)] uppercase'>
                {project.date}
              </span>
              <div className='flex items-center gap-2'>
                {project.link && (
                  <a
                    href={project.link}
                    target='_blank'
                    rel='noreferrer'
                    onClick={stopPropagation}
                    onKeyDown={stopPropagation}
                    className='rounded-full border border-[color:var(--border-subtle)] px-3 py-1 text-xs tracking-[0.2em] text-[color:var(--text-primary)] uppercase transition-colors hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]'
                  >
                    Visit
                  </a>
                )}
                {project.source && (
                  <a
                    href={project.source}
                    target='_blank'
                    rel='noreferrer'
                    onClick={stopPropagation}
                    onKeyDown={stopPropagation}
                    className='rounded-full border border-[color:var(--border-subtle)] px-3 py-1 text-xs tracking-[0.2em] text-[color:var(--text-primary)] uppercase transition-colors hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]'
                  >
                    Source
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div aria-hidden className='h-2' />
    </article>
  );
});
