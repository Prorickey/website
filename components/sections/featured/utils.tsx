'use client';

import type { ProjectMetadata } from '@/components/Projects';

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
export const MAX_CALLOUTS = 6;

export function clamp01(v: number) {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

export function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

export function numeral(i: number, n: number) {
  return `${String(i + 1).padStart(2, '0')} / ${String(n).padStart(2, '0')}`;
}

export function sheetNo(i: number) {
  return String(i + 1).padStart(2, '0');
}

// Same hold/transition pacing the robot story uses: each sheet holds for a
// share of the scroll, then eases to the next.
export function displacedProgress(
  p: number,
  n: number,
  holdFraction = 0.45
): number {
  if (n <= 1) return 0;
  const holdPer = holdFraction / n;
  const transPer = (1 - holdFraction) / (n - 1);
  const step = 1 / (n - 1);

  let input = 0;
  for (let i = 0; i < n; i++) {
    const holdEnd = input + holdPer;
    if (p < holdEnd) return i * step;
    input = holdEnd;

    if (i === n - 1) return 1;

    const transEnd = input + transPer;
    if (p < transEnd) {
      const t = (p - input) / transPer;
      return i * step + smoothstep(t) * step;
    }
    input = transEnd;
  }
  return 1;
}

// Drafting grid: 120px major, 24px minor.
export const GRID_STYLE = {
  backgroundImage:
    'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), ' +
    'linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px), ' +
    'linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), ' +
    'linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)',
  backgroundSize: '120px 120px, 120px 120px, 24px 24px, 24px 24px',
} as const;

const LANG_NAMES: Record<string, string> = {
  nodejs: 'Node.js',
  react: 'React',
  typescript: 'TypeScript',
  javascript: 'JavaScript',
  html: 'HTML',
  css: 'CSS',
  tailwindcss: 'Tailwind CSS',
  nextjs: 'Next.js',
  git: 'Git',
  docker: 'Docker',
  kubernetes: 'Kubernetes',
  postgresql: 'PostgreSQL',
  redis: 'Redis',
  golang: 'Go',
  expo: 'Expo',
  python: 'Python',
  swiftui: 'SwiftUI',
  onshape: 'Onshape',
  cpp: 'C++',
  java: 'Java',
  kotlin: 'Kotlin',
  rust: 'Rust',
  mongodb: 'MongoDB',
  mysql: 'MySQL',
  linux: 'Linux',
  bun: 'Bun',
  claude: 'Claude',
};

export function langName(slug: string) {
  return LANG_NAMES[slug] ?? slug.charAt(0).toUpperCase() + slug.slice(1);
}

export function langIcon(slug: string) {
  return `/knows/${slug === 'onshape' ? 'onshape.png' : `${slug}.svg`}`;
}

const stop = (e: React.SyntheticEvent) => e.stopPropagation();

const PILL =
  'rounded-full border border-[color:var(--border-subtle)] px-3 py-1 text-xs tracking-[0.2em] text-[color:var(--text-primary)] uppercase transition-colors hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]';

export function ProjectLinks({ project }: { project: ProjectMetadata }) {
  return (
    <div className='flex items-center gap-2'>
      {project.link && (
        <a
          href={project.link}
          target='_blank'
          rel='noreferrer'
          onClick={stop}
          onKeyDown={stop}
          className={PILL}
        >
          Visit
        </a>
      )}
      {project.source && (
        <a
          href={project.source}
          target='_blank'
          rel='noreferrer'
          onClick={stop}
          onKeyDown={stop}
          className={PILL}
        >
          Source
        </a>
      )}
    </div>
  );
}
