'use client';

import { useEffect, useRef } from 'react';

const RADIUS = 16;
const HOVER_RADIUS = 36;

export default function SmoothCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canHover = window.matchMedia(
      '(hover: hover) and (pointer: fine)'
    ).matches;
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (!canHover || prefersReduced) return;

    if (dotRef.current) dotRef.current.style.opacity = '1';
    if (ringRef.current) ringRef.current.style.opacity = '1';
    document.documentElement.classList.add('smooth-cursor-active');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX - RADIUS / 2}px, ${mouseY - RADIUS / 2}px, 0)`;
      }
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target || !ringRef.current) return;
      const interactive = target.closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor="hover"]'
      );
      ringRef.current.style.width = `${interactive ? HOVER_RADIUS : RADIUS * 1.5}px`;
      ringRef.current.style.height = `${interactive ? HOVER_RADIUS : RADIUS * 1.5}px`;
      ringRef.current.style.borderColor = interactive
        ? 'var(--accent)'
        : 'rgba(231,231,231,0.5)';
    };

    const tick = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) {
        const size = ringRef.current.offsetWidth || RADIUS * 1.5;
        ringRef.current.style.transform = `translate3d(${ringX - size / 2}px, ${ringY - size / 2}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove('smooth-cursor-active');
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className='pointer-events-none fixed top-0 left-0 z-[9999]'
        style={{
          width: RADIUS,
          height: RADIUS,
          borderRadius: '50%',
          background: 'var(--foreground)',
          mixBlendMode: 'difference',
          willChange: 'transform',
          opacity: 0,
        }}
      />
      <div
        ref={ringRef}
        aria-hidden
        className='pointer-events-none fixed top-0 left-0 z-[9998]'
        style={{
          width: RADIUS * 1.5,
          height: RADIUS * 1.5,
          borderRadius: '50%',
          border: '1px solid rgba(231,231,231,0.5)',
          transition:
            'width 180ms ease, height 180ms ease, border-color 180ms ease',
          willChange: 'transform, width, height',
          opacity: 0,
        }}
      />
    </>
  );
}
