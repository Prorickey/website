'use client';

import { useEffect, useState, type ReactNode } from 'react';

// Mounts children after the first paint so they don't block LCP,
// but load immediately in the background so they're ready when the user scrolls.
export default function LazySection({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id =
      typeof requestIdleCallback !== 'undefined'
        ? requestIdleCallback(() => setMounted(true))
        : setTimeout(() => setMounted(true), 0);
    return () => {
      if (typeof cancelIdleCallback !== 'undefined') cancelIdleCallback(id as number);
      else clearTimeout(id as number);
    };
  }, []);

  return <>{mounted && children}</>;
}
