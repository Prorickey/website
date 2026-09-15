'use client';

import { AnimatePresence } from 'framer-motion';
import { useEffect, useState, useSyncExternalStore } from 'react';
import type { ProjectMetadata } from '@/components/Projects';
import { useLenis } from '@/components/providers/LenisProvider';
import { ExpandedCaseStudy } from './featured/ExpandedCaseStudy';
import { PinnedSheets } from './featured/PinnedSheets';
import { StaticSheets } from './featured/StaticSheets';

const N_FEATURED = 3;

function useReducedMotion() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      mq.addEventListener('change', onChange);
      return () => mq.removeEventListener('change', onChange);
    },
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => false
  );
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

/**
 * The first three projects in `public/projects/index.json`, presented as a
 * pinned drawing set on desktop and as a plain run of sheets on phones or
 * with reduced motion. Clicking a sheet opens the case study.
 */
export function FeaturedProjects() {
  const [featured, setFeatured] = useState<ProjectMetadata[]>([]);
  const [langlinks, setLanglinks] = useState<Record<string, string>>({});
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const reducedMotion = useReducedMotion();
  const lenisRef = useLenis();

  useEffect(() => {
    let cancelled = false;
    loadFeatured().then((projects) => {
      if (!cancelled) setFeatured(projects);
    });
    fetch('/langlinks.json')
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setLanglinks(data);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const lenis = lenisRef?.current;
    if (!lenis) return;
    if (expandedIndex !== null) lenis.stop();
    else lenis.start();
  }, [expandedIndex, lenisRef]);

  if (featured.length === 0) return null;

  return (
    <>
      {!reducedMotion && (
        <PinnedSheets
          className='hidden md:block'
          projects={featured}
          langlinks={langlinks}
          onExpand={setExpandedIndex}
        />
      )}
      <StaticSheets
        className={reducedMotion ? 'block' : 'md:hidden'}
        projects={featured}
        langlinks={langlinks}
        onExpand={setExpandedIndex}
      />

      <AnimatePresence>
        {expandedIndex !== null && (
          <ExpandedCaseStudy
            project={featured[expandedIndex]}
            langlinks={langlinks}
            onClose={() => setExpandedIndex(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
