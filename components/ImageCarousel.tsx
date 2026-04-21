'use client';

import { useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';

const EQUILIBRIUM_VELOCITY = -0.25;
const WHEEL_FORCE = 0.0045;
const MAX_VELOCITY = 14;
const IDLE_MS_BEFORE_RESUME = 1000;
const DECAY_DURING_INPUT = 0.965;
const EASE_BACK_RATE = 0.03;
const HORIZONTAL_LOCK_MS = 180;
const HORIZONTAL_ENTRY_BIAS = 1.4;

const images = [
  { src: '/images/nctsa.png', alt: 'NC TSA' },
  { src: '/images/robotics.jpeg', alt: 'Robotics' },
  { src: '/images/smathhacks.jpg', alt: 'SMath Hacks' },
  { src: '/images/glasses.jpeg', alt: 'Glasses' },
  { src: '/images/lenovo.jpeg', alt: 'Lenovo' },
  { src: '/images/attaches.jpeg', alt: 'Attaché Cohort' },
];

const topImages = images.slice(0, Math.ceil(images.length / 2));
const bottomImages = images.slice(Math.ceil(images.length / 2));

export function ImageCarousel() {
  const desktopWrapRef = useRef<HTMLDivElement | null>(null);
  const mobileTopWrapRef = useRef<HTMLDivElement | null>(null);
  const mobileBottomWrapRef = useRef<HTMLDivElement | null>(null);

  const scrollContainerRefDesktop = useRef<HTMLDivElement | null>(null);
  const scrollContainerRefMobile = useRef<HTMLDivElement | null>(null);
  const reverseScrollContainerRef = useRef<HTMLDivElement | null>(null);

  const offsetRef = useRef(0);
  const reverseOffsetRef = useRef(0);
  const velocityRef = useRef(EQUILIBRIUM_VELOCITY);
  const forceRef = useRef(0);
  const lastInteractionRef = useRef(0);
  const horizontalLockUntilRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  const desktopImageWidth = 600 + 32;
  const mobileImageWidth = 280 + 16;
  const desktopLoopWidth = images.length * desktopImageWidth;
  const mobileLoopWidth = topImages.length * mobileImageWidth;

  useEffect(() => {
    const animate = () => {
      const now = performance.now();
      const isMobile = window.innerWidth < 768;
      const loopWidth = isMobile ? mobileLoopWidth : desktopLoopWidth;

      velocityRef.current += forceRef.current;
      forceRef.current *= 0.6;
      if (Math.abs(forceRef.current) < 0.0005) forceRef.current = 0;

      const idleFor = now - lastInteractionRef.current;
      if (idleFor > IDLE_MS_BEFORE_RESUME) {
        velocityRef.current +=
          (EQUILIBRIUM_VELOCITY - velocityRef.current) * EASE_BACK_RATE;
      } else {
        velocityRef.current =
          velocityRef.current * DECAY_DURING_INPUT +
          EQUILIBRIUM_VELOCITY * (1 - DECAY_DURING_INPUT);
      }

      if (velocityRef.current > MAX_VELOCITY) velocityRef.current = MAX_VELOCITY;
      if (velocityRef.current < -MAX_VELOCITY) velocityRef.current = -MAX_VELOCITY;

      offsetRef.current += velocityRef.current;
      if (offsetRef.current <= -loopWidth) offsetRef.current += loopWidth;
      if (offsetRef.current > 0) offsetRef.current -= loopWidth;

      reverseOffsetRef.current -= velocityRef.current;
      if (reverseOffsetRef.current >= 0)
        reverseOffsetRef.current -= loopWidth;
      if (reverseOffsetRef.current < -loopWidth)
        reverseOffsetRef.current += loopWidth;

      if (scrollContainerRefDesktop.current) {
        scrollContainerRefDesktop.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
      }
      if (scrollContainerRefMobile.current) {
        scrollContainerRefMobile.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
      }
      if (reverseScrollContainerRef.current) {
        reverseScrollContainerRef.current.style.transform = `translate3d(${reverseOffsetRef.current}px, 0, 0)`;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
    };
  }, [desktopLoopWidth, mobileLoopWidth]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const now = performance.now();
      const absX = Math.abs(e.deltaX);
      const absY = Math.abs(e.deltaY);
      const lockActive = now < horizontalLockUntilRef.current;
      const horizontalIntent = absX * HORIZONTAL_ENTRY_BIAS > absY;

      if (!lockActive && !horizontalIntent) return;

      e.preventDefault();
      e.stopPropagation();

      horizontalLockUntilRef.current = now + HORIZONTAL_LOCK_MS;
      lastInteractionRef.current = now;

      if (absX > 0) {
        forceRef.current -= e.deltaX * WHEEL_FORCE;
      }
    };

    const wraps = [
      desktopWrapRef.current,
      mobileTopWrapRef.current,
      mobileBottomWrapRef.current,
    ].filter((w): w is HTMLDivElement => w !== null);

    wraps.forEach((w) => w.addEventListener('wheel', handleWheel, { passive: false }));
    return () => {
      wraps.forEach((w) => w.removeEventListener('wheel', handleWheel));
    };
  }, []);

  const duplicatedImages = useMemo(
    () => [...images, ...images, ...images, ...images],
    []
  );
  const duplicatedTopImages = useMemo(
    () => [...topImages, ...topImages, ...topImages, ...topImages],
    []
  );
  const duplicatedBottomImages = useMemo(
    () => [...bottomImages, ...bottomImages, ...bottomImages, ...bottomImages],
    []
  );

  return (
    <div className='relative w-full overflow-hidden py-10'>
      {/* Desktop carousel - single row */}
      <div
        ref={desktopWrapRef}
        className='relative hidden h-[350px] w-full overflow-hidden md:block'
      >
        <div className='pointer-events-none absolute top-0 left-0 z-10 h-full w-48 bg-linear-to-r from-[color:var(--background)] to-transparent' />
        <div className='pointer-events-none absolute top-0 right-0 z-10 h-full w-48 bg-linear-to-l from-[color:var(--background)] to-transparent' />
        <div className='flex h-full gap-8'>
          <div
            ref={scrollContainerRefDesktop}
            className='flex h-full gap-8 will-change-transform'
          >
            {duplicatedImages.map((image, index) => (
              <div
                key={`${image.src}-${index}`}
                className='relative h-full w-[600px] shrink-0 overflow-hidden rounded-xl'
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className='object-cover'
                  priority={index < 3}
                  sizes='600px'
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile carousels - two rows going opposite directions */}
      <div className='space-y-4 md:hidden'>
        <div
          ref={mobileTopWrapRef}
          className='relative h-[150px] w-full overflow-hidden'
        >
          <div className='pointer-events-none absolute top-0 left-0 z-10 h-full w-16 bg-linear-to-r from-[color:var(--background)] to-transparent' />
          <div className='pointer-events-none absolute top-0 right-0 z-10 h-full w-16 bg-linear-to-l from-[color:var(--background)] to-transparent' />
          <div className='flex h-full gap-4'>
            <div
              ref={scrollContainerRefMobile}
              className='flex h-full gap-4 will-change-transform'
            >
              {duplicatedTopImages.map((image, index) => (
                <div
                  key={`${image.src}-${index}`}
                  className='relative h-full w-[280px] shrink-0 overflow-hidden rounded-xl'
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className='object-cover'
                    priority={index < 3}
                    sizes='280px'
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          ref={mobileBottomWrapRef}
          className='relative h-[150px] w-full overflow-hidden'
        >
          <div className='pointer-events-none absolute top-0 left-0 z-10 h-full w-16 bg-linear-to-r from-[color:var(--background)] to-transparent' />
          <div className='pointer-events-none absolute top-0 right-0 z-10 h-full w-16 bg-linear-to-l from-[color:var(--background)] to-transparent' />
          <div className='flex h-full gap-4'>
            <div
              ref={reverseScrollContainerRef}
              className='flex h-full gap-4 will-change-transform'
            >
              {duplicatedBottomImages.map((image, index) => (
                <div
                  key={`${image.src}-reverse-${index}`}
                  className='relative h-full w-[280px] shrink-0 overflow-hidden rounded-xl'
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className='object-cover'
                    priority={index < 3}
                    sizes='280px'
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
