'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import type { ProjectMetadata } from '@/components/Projects';
import {
  Callouts,
  CornerBrackets,
  DimensionLines,
  FigureLabels,
} from './Drafting';
import {
  displacedProgress,
  EASE_OUT,
  GRID_STYLE,
  numeral,
  ProjectLinks,
  sheetNo,
} from './utils';

const EXTRA_SCROLL_VH = 60;

type Props = {
  projects: ProjectMetadata[];
  langlinks: Record<string, string>;
  onExpand: (index: number) => void;
  className?: string;
};

/**
 * Featured work as a pinned drawing set. The section pins for the length of
 * the scroll like the robot story; one sheet fills the viewport at a time and
 * scroll scrubs between them. The figure wipes to the next screenshot, the
 * copy and callouts re-stagger, and a giant faint sheet numeral marks where
 * you are.
 */
export function PinnedSheets({
  projects,
  langlinks,
  onExpand,
  className = '',
}: Props) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const n = projects.length;

  useEffect(() => {
    let raf = 0;
    let last = -1;
    const tick = () => {
      const el = sectionRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const p = total > 0 ? Math.max(0, Math.min(1, -rect.top / total)) : 0;
        const idx = Math.round(displacedProgress(p, n) * Math.max(1, n - 1));
        if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
        if (idx !== last) {
          last = idx;
          setActive(idx);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [n]);

  const project = projects[active];

  return (
    <section
      ref={sectionRef}
      id='featured'
      aria-label='Featured projects'
      className={`relative ${className}`}
      style={{ height: `${n * 100 + EXTRA_SCROLL_VH}vh` }}
    >
      <div
        className='sticky top-0 h-screen w-full overflow-hidden bg-[color:var(--surface-2)]'
        style={GRID_STYLE}
      >
        {/* Sits below the fixed navbar. */}
        <div className='pointer-events-none absolute top-[11vh] right-[6vw] left-[6vw] z-10 flex items-center justify-between text-xs tracking-[0.4em] text-[color:var(--text-muted)] uppercase'>
          <span>03 — Featured Work</span>
        </div>

        {/* Giant sheet numeral */}
        <AnimatePresence mode='popLayout' initial={false}>
          <motion.span
            key={active}
            aria-hidden
            className='pointer-events-none absolute -right-[1vw] -bottom-[8vh] leading-none font-semibold select-none'
            style={{
              fontSize: '34vw',
              letterSpacing: '-0.06em',
              color: 'transparent',
              WebkitTextStroke: '1px rgba(255,255,255,0.08)',
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          >
            {sheetNo(active)}
          </motion.span>
        </AnimatePresence>

        <div className='absolute inset-x-[6vw] top-[16vh] bottom-[9vh] grid items-center gap-8 md:grid-cols-[1.15fr_1fr] md:gap-14 lg:gap-20'>
          {/* Figure */}
          <div className='relative'>
            <div className='relative'>
              <CornerBrackets />

              <div
                className='relative aspect-video cursor-pointer overflow-hidden rounded-lg border border-[color:var(--border-subtle)] bg-[color:var(--surface-1)]'
                onClick={() => onExpand(active)}
              >
                {projects.map(
                  (p, i) =>
                    p.image && (
                      <motion.div
                        key={p.slug}
                        className='absolute inset-0'
                        style={{ zIndex: i === active ? 2 : 1 }}
                        initial={false}
                        animate={{
                          clipPath:
                            i === active
                              ? 'inset(0 0% 0 0%)'
                              : i < active
                                ? 'inset(0 100% 0 0%)'
                                : 'inset(0 0% 0 100%)',
                        }}
                        transition={{ duration: 0.8, ease: EASE_OUT }}
                      >
                        <Image
                          src={p.image}
                          alt={p.title}
                          fill
                          sizes='(max-width: 768px) 88vw, 52vw'
                          className='object-cover'
                          loading='eager'
                        />
                      </motion.div>
                    )
                )}
                <motion.div
                  key={`scan-${active}`}
                  aria-hidden
                  className='absolute inset-y-0 z-[3] w-px bg-[color:var(--accent)] shadow-[0_0_28px_5px_rgba(219,76,76,0.55)]'
                  initial={{ left: '0%', opacity: 1 }}
                  animate={{ left: '100%', opacity: 0 }}
                  transition={{ duration: 0.8, ease: EASE_OUT }}
                />
              </div>

              <DimensionLines />
              <FigureLabels
                sheet={sheetNo(active)}
                techCount={project?.langs.length ?? 0}
              />
            </div>
          </div>

          {/* Copy */}
          <div className='relative min-h-[40vh]'>
            <AnimatePresence mode='popLayout' initial={false}>
              {project && (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14, transition: { duration: 0.18 } }}
                  transition={{ duration: 0.45, ease: EASE_OUT, delay: 0.1 }}
                  className='flex flex-col gap-6'
                >
                  <span className='text-[11px] tracking-[0.3em] text-[color:var(--text-muted)] uppercase'>
                    Sheet {numeral(active, n)}{' '}
                    <span className='text-[color:var(--accent)]'>·</span>{' '}
                    {project.date}
                  </span>
                  <button
                    onClick={() => onExpand(active)}
                    className='group text-left'
                  >
                    <h3
                      className='text-balance'
                      style={{
                        fontSize: 'clamp(2.2rem, 4.6vw, 4.8rem)',
                        lineHeight: 1.02,
                        fontWeight: 600,
                        letterSpacing: '-0.03em',
                      }}
                    >
                      {project.title}
                      <span
                        aria-hidden
                        className='ml-3 inline-block align-middle text-[0.5em] text-[color:var(--accent)] transition-transform duration-500 group-hover:translate-x-1'
                      >
                        ↗
                      </span>
                    </h3>
                  </button>
                  <p className='max-w-xl text-[color:var(--text-muted)] lg:text-lg'>
                    {project.shortDescription}
                  </p>

                  <Callouts
                    langs={project.langs}
                    langlinks={langlinks}
                    reveal='mount'
                  />

                  <div className='flex items-center gap-4 border-t border-[color:var(--border-subtle)] pt-5'>
                    <button
                      onClick={() => onExpand(active)}
                      className='text-xs tracking-[0.3em] text-[color:var(--accent)] uppercase'
                    >
                      Open sheet →
                    </button>
                    <ProjectLinks project={project} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className='pointer-events-none absolute bottom-2 left-1/2 z-10 -translate-x-1/2 text-[10px] tracking-[0.3em] text-[color:var(--text-muted)] uppercase'>
          Scroll
        </div>
        <div className='absolute bottom-0 left-0 h-[2px] w-full'>
          <div
            ref={barRef}
            className='h-full origin-left bg-[color:var(--accent)]'
            style={{ transform: 'scaleX(0)' }}
          />
        </div>
      </div>
    </section>
  );
}
