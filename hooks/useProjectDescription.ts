'use client';

import { useEffect, useReducer } from 'react';

const cache = new Map<string, string>();

export function useProjectDescription(slug: string | null): string | null {
  const [, forceRender] = useReducer((x: number) => x + 1, 0);

  useEffect(() => {
    if (!slug || cache.has(slug)) return;

    let cancelled = false;
    fetch(`/projects/${slug}/description.txt`)
      .then((res) => res.text())
      .then((text) => {
        if (cancelled) return;
        cache.set(slug, text);
        forceRender();
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (!slug) return null;
  return cache.get(slug) ?? null;
}
