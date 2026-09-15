'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { ProjectMetadata } from '@/components/Projects';
import {
  Callouts,
  CornerBrackets,
  DimensionLines,
  FigureLabels,
  VIEW,
} from './Drafting';
import { EASE_OUT, GRID_STYLE, numeral, ProjectLinks, sheetNo } from './utils';

type Props = {
  projects: ProjectMetadata[];
  langlinks: Record<string, string>;
  onExpand: (index: number) => void;
  className?: string;
};

/**
 * The same drawing set without the pin: one sheet after another, revealed as
 * they scroll into view. Used on small screens, where the pinned layout does
 * not fit a viewport, and when the visitor prefers reduced motion.
 */
export function StaticSheets({
  projects,
  langlinks,
  onExpand,
  className = '',
}: Props) {
  const n = projects.length;

  return (
    <section
      id='featured-sheets'
      aria-label='Featured projects'
      className={`relative overflow-hidden bg-[color:var(--surface-2)] py-[8vh] ${className}`}
      style={GRID_STYLE}
    >
      <div className='flex items-center justify-between px-[8vw] text-xs tracking-[0.4em] text-[color:var(--text-muted)] uppercase'>
        <span>03 — Featured Work</span>
        <span>DWG set · {n} sheets</span>
      </div>

      {projects.map((project, i) => (
        <article
          key={project.slug}
          className='flex flex-col gap-10 px-[8vw] py-[10vh]'
        >
          <span className='text-[11px] tracking-[0.3em] text-[color:var(--text-muted)] uppercase'>
            Sheet {numeral(i, n)}{' '}
            <span className='text-[color:var(--accent)]'>·</span> {project.date}
          </span>

          <div className='relative mt-4 ml-6'>
            <CornerBrackets />
            <div
              className='relative aspect-video cursor-pointer overflow-hidden rounded-lg border border-[color:var(--border-subtle)] bg-[color:var(--surface-1)]'
              onClick={() => onExpand(i)}
            >
              {project.image && (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes='84vw'
                  className='object-cover'
                  loading='eager'
                />
              )}
              {/* Wipe: a cover that shrinks from the right, so the image is never clipped. */}
              <motion.div
                aria-hidden
                className='absolute inset-0 origin-right bg-[color:var(--surface-1)]'
                initial={{ scaleX: 1 }}
                whileInView={{ scaleX: 0 }}
                viewport={VIEW}
                transition={{ duration: 1, ease: EASE_OUT }}
              />
            </div>
            <DimensionLines />
            <FigureLabels sheet={sheetNo(i)} techCount={project.langs.length} />
          </div>

          <motion.div
            className='flex flex-col gap-5'
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEW}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.2 }}
          >
            <button onClick={() => onExpand(i)} className='text-left'>
              <h3
                className='text-balance'
                style={{
                  fontSize: 'clamp(1.9rem, 8vw, 3rem)',
                  lineHeight: 1.05,
                  fontWeight: 600,
                  letterSpacing: '-0.025em',
                }}
              >
                {project.title}
              </h3>
            </button>
            <p className='text-[color:var(--text-muted)]'>
              {project.shortDescription}
            </p>
            <Callouts
              langs={project.langs}
              langlinks={langlinks}
              reveal='inView'
            />
            <div className='flex flex-wrap items-center gap-4 border-t border-[color:var(--border-subtle)] pt-5'>
              <button
                onClick={() => onExpand(i)}
                className='text-xs tracking-[0.3em] text-[color:var(--accent)] uppercase'
              >
                Open sheet →
              </button>
              <ProjectLinks project={project} />
            </div>
          </motion.div>
        </article>
      ))}
    </section>
  );
}
