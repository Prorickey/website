'use client';

import { useEffect, useRef, useState } from 'react';
import type { ProjectMetadata } from '@/components/Projects';
import { Panel } from './featured/Panel';

const N_FEATURED = 3;
const EXTRA_SCROLL_VH = 40;

function clamp01(v: number) {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

async function loadFeatured(): Promise<ProjectMetadata[]> {
  const indexRes = await fetch('/projects/index.json');
  const slugs: string[] = await indexRes.json();
  const featuredSlugs = slugs.slice(0, N_FEATURED);

  return Promise.all(
    featuredSlugs.map(async (slug) => {
      const res = await fetch(`/projects/${slug}/metadata.json`);
      const metadata = await res.json();
      const image = metadata.image
        ? `/projects/${slug}/${metadata.image}`
        : null;
      return { ...metadata, slug, image } as ProjectMetadata;
    })
  );
}

export function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const panelRefs = useRef<Array<HTMLElement | null>>([]);
  const [featured, setFeatured] = useState<ProjectMetadata[]>([]);

  useEffect(() => {
    let cancelled = false;
    loadFeatured().then((projects) => {
      if (!cancelled) setFeatured(projects);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (featured.length === 0) return;
    const n = featured.length;

    let raf = 0;
    const tick = () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      const bar = progressBarRef.current;
      if (section && track) {
        const rect = section.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const scrolled = -rect.top;
        const progress =
          total > 0 ? Math.max(0, Math.min(1, scrolled / total)) : 0;

        const translateX = -progress * (n - 1) * window.innerWidth;
        track.style.transform = `translate3d(${translateX}px, 0, 0)`;

        if (bar) bar.style.transform = `scaleX(${progress})`;

        for (let i = 0; i < n; i++) {
          const el = panelRefs.current[i];
          if (!el) continue;
          const localP = progress * (n - 1) - i;

          const imgWrap = el.querySelector<HTMLElement>(
            '[data-panel-image-wrap]'
          );
          if (imgWrap) {
            imgWrap.style.transform = `translateX(${localP * 6}%)`;
          }

          const title = el.querySelector<HTMLElement>('[data-panel-title]');
          if (title) {
            const revealIn = clamp01((localP + 0.55) / 0.5);
            const revealOut = clamp01((localP - 0.3) / 0.5);
            const clipRight = (1 - revealIn) * 100;
            const clipLeft = revealOut * 100;
            title.style.clipPath = `inset(0 ${clipRight.toFixed(2)}% 0 ${clipLeft.toFixed(2)}%)`;
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [featured.length]);

  if (featured.length === 0) return null;

  const n = featured.length;
  const sectionHeight = n * 100 + EXTRA_SCROLL_VH;

  return (
    <section
      ref={sectionRef}
      id='featured'
      className='relative hidden md:block'
      style={{ height: `${sectionHeight}vh` }}
      aria-label='Featured projects'
    >
      <div className='sticky top-0 flex h-screen w-full flex-col overflow-hidden bg-[color:var(--background)]'>
        <div className='relative h-[2px] w-full bg-[color:var(--border-subtle)]'>
          <div
            ref={progressBarRef}
            className='h-full origin-left bg-[color:var(--accent)]'
            style={{ transform: 'scaleX(0)' }}
          />
        </div>

        <header className='pointer-events-none absolute top-[3.5vh] left-[8vw] z-10'>
          <span className='text-xs tracking-[0.4em] text-[color:var(--text-muted)] uppercase'>
            03 — Featured Work
          </span>
        </header>

        <div
          ref={trackRef}
          className='flex h-full will-change-transform'
          style={{ width: `${n * 100}vw` }}
        >
          {featured.map((project, i) => (
            <Panel
              key={project.slug}
              ref={(el) => {
                panelRefs.current[i] = el;
              }}
              project={project}
              index={i}
              total={n}
              onExpand={() => {
                /* wired in phase 5 */
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
