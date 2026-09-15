'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { EASE_OUT, langIcon, langName, MAX_CALLOUTS } from './utils';

export const VIEW = { once: true, amount: 0.3 } as const;

const LINE =
  'stroke-[color:var(--accent)] [stroke-width:1] [vector-effect:non-scaling-stroke]';

/** Accent corner brackets around a figure, popping in when scrolled to. */
export function CornerBrackets() {
  return (
    <>
      {[
        '-top-3 -left-3 border-t border-l',
        '-top-3 -right-3 border-t border-r',
        '-bottom-3 -left-3 border-b border-l',
        '-bottom-3 -right-3 border-b border-r',
      ].map((c, ci) => (
        <motion.span
          key={c}
          aria-hidden
          className={`absolute h-5 w-5 border-[color:var(--accent)] ${c}`}
          initial={{ opacity: 0, scale: 0.4 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={VIEW}
          transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.3 + ci * 0.06 }}
        />
      ))}
    </>
  );
}

/**
 * Dimension lines that draw themselves: one above the figure, one down its
 * left edge. Percent coordinates are relative to the figure, so this must sit
 * inside a `relative` wrapper the same size as the figure.
 */
export function DimensionLines() {
  return (
    <svg
      aria-hidden
      className='pointer-events-none absolute inset-0 h-full w-full overflow-visible'
    >
      <motion.line
        x1='0'
        y1='-26'
        x2='100%'
        y2='-26'
        className={LINE}
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={VIEW}
        transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.2 }}
      />
      <line x1='0' y1='-34' x2='0' y2='-18' className={LINE} />
      <line x1='100%' y1='-34' x2='100%' y2='-18' className={LINE} />
      <g transform='translate(-26 0)'>
        <motion.line
          x1='0'
          y1='0'
          x2='0'
          y2='100%'
          className={LINE}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={VIEW}
          transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.45 }}
        />
        <line x1='-8' y1='0' x2='8' y2='0' className={LINE} />
        <line x1='-8' y1='100%' x2='8' y2='100%' className={LINE} />
      </g>
    </svg>
  );
}

/** "Fig. 01 · 16:9" above the figure and "N technologies" down its side. */
export function FigureLabels({
  sheet,
  techCount,
}: {
  sheet: string;
  techCount: number;
}) {
  return (
    <>
      <span
        aria-hidden
        className='absolute -top-[2.1rem] left-1/2 -translate-x-1/2 bg-[color:var(--surface-2)] px-2 text-[10px] tracking-[0.3em] whitespace-nowrap text-[color:var(--text-muted)] uppercase'
      >
        Fig. {sheet} · 16 : 9
      </span>
      <span
        aria-hidden
        className='absolute top-1/2 -left-[2.1rem] -translate-x-1/2 -rotate-90 bg-[color:var(--surface-2)] px-2 text-[10px] tracking-[0.3em] whitespace-nowrap text-[color:var(--text-muted)] uppercase'
      >
        {techCount} technologies
      </span>
    </>
  );
}

type CalloutsProps = {
  langs: string[];
  langlinks: Record<string, string>;
  /** 'mount' re-staggers whenever the list mounts; 'inView' waits for scroll. */
  reveal: 'mount' | 'inView';
};

/** Leader-line callouts for the first few technologies, "+ N more" after. */
export function Callouts({ langs, langlinks, reveal }: CalloutsProps) {
  const shown = langs.slice(0, MAX_CALLOUTS);
  const extra = langs.length - shown.length;

  return (
    <ul className='flex flex-col gap-2'>
      {shown.map((lang, ci) => {
        const href = langlinks[lang];
        const label = (
          <span className='flex items-center gap-2.5'>
            <Image
              src={langIcon(lang)}
              alt=''
              width={16}
              height={16}
              className='aspect-square object-contain'
            />
            <span className='text-[11px] tracking-[0.2em] text-[color:var(--text-primary)] uppercase'>
              {langName(lang)}
            </span>
          </span>
        );
        const motionProps =
          reveal === 'mount'
            ? { animate: { opacity: 1, x: 0 } }
            : { whileInView: { opacity: 1, x: 0 }, viewport: VIEW };
        return (
          <motion.li
            key={lang}
            className='flex items-center gap-3'
            initial={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.35, delay: 0.25 + ci * 0.07 }}
            {...motionProps}
          >
            <span className='flex items-center'>
              <span aria-hidden className='h-px w-8 bg-[color:var(--accent)]' />
              <span
                aria-hidden
                className='h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]'
              />
            </span>
            {href ? (
              <a
                href={href}
                target='_blank'
                rel='noreferrer'
                onClick={(e) => e.stopPropagation()}
                className='transition-opacity hover:opacity-70'
              >
                {label}
              </a>
            ) : (
              label
            )}
          </motion.li>
        );
      })}
      {extra > 0 && (
        <li className='pl-[3.2rem] text-[11px] tracking-[0.2em] text-[color:var(--text-muted)] uppercase'>
          + {extra} more
        </li>
      )}
    </ul>
  );
}
