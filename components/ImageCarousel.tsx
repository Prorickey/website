'use client';

import { useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';

const EQUILIBRIUM_VELOCITY = -0.25;

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
  const containerRef = useRef<HTMLDivElement>(null);

  const offsetRef = useRef(0);
  const reverseOffsetRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const scrollContainerRefDesktop = useRef<HTMLDivElement>(null);
  const scrollContainerRefMobile = useRef<HTMLDivElement>(null);
  const reverseScrollContainerRef = useRef<HTMLDivElement>(null);

  // Calculate image widths once
  const desktopImageWidth = 600 + 32; // image width + gap
  const mobileImageWidth = 280 + 16; // image width + gap
  const desktopLoopWidth = images.length * desktopImageWidth;
  const mobileLoopWidth = topImages.length * mobileImageWidth;

  useEffect(() => {
    const animate = () => {
      const isMobile = window.innerWidth < 768;
      const loopWidth = isMobile ? mobileLoopWidth : desktopLoopWidth;

      // Forward carousel
      offsetRef.current += EQUILIBRIUM_VELOCITY;
      if (offsetRef.current <= -loopWidth) {
        offsetRef.current = 0;
      }

      if (scrollContainerRefDesktop.current) {
        scrollContainerRefDesktop.current.style.transform = `translateX(${offsetRef.current}px)`;
      }

      if (scrollContainerRefMobile.current) {
        scrollContainerRefMobile.current.style.transform = `translateX(${offsetRef.current}px)`;
      }

      // Reverse carousel for mobile (moves right, starts at negative offset)
      reverseOffsetRef.current -= EQUILIBRIUM_VELOCITY;
      if (reverseOffsetRef.current >= 0) {
        reverseOffsetRef.current = -loopWidth;
      }

      if (reverseScrollContainerRef.current) {
        reverseScrollContainerRef.current.style.transform = `translateX(${reverseOffsetRef.current}px)`;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [desktopLoopWidth, mobileLoopWidth]);

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
    <div ref={containerRef} className='relative w-full overflow-hidden py-10'>
      {/* Desktop carousel - single row */}
      <div className='relative hidden h-[350px] w-full md:block'>
        <div className='pointer-events-none absolute top-0 left-0 z-10 h-full w-48 bg-linear-to-r from-white to-transparent dark:from-black' />
        <div className='pointer-events-none absolute top-0 right-0 z-10 h-full w-48 bg-linear-to-l from-white to-transparent dark:from-black' />
        <div className='flex h-full gap-8'>
          <div ref={scrollContainerRefDesktop} className='flex h-full gap-8'>
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
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile carousels - two rows going opposite directions */}
      <div className='space-y-4 md:hidden'>
        {/* First carousel - top half of images, left to right */}
        <div className='relative h-[150px] w-full'>
          <div className='pointer-events-none absolute top-0 left-0 z-10 h-full w-16 bg-linear-to-r from-white to-transparent dark:from-[#000000AA]' />
          <div className='pointer-events-none absolute top-0 right-0 z-10 h-full w-16 bg-linear-to-l from-white to-transparent dark:from-[#000000AA]' />
          <div className='flex h-full gap-4 overflow-hidden'>
            <div ref={scrollContainerRefMobile} className='flex h-full gap-4'>
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
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Second carousel - bottom half of images, right to left */}
        <div className='relative h-[150px] w-full'>
          <div className='pointer-events-none absolute top-0 left-0 z-10 h-full w-16 bg-linear-to-r from-white to-transparent dark:from-[#000000AA]' />
          <div className='pointer-events-none absolute top-0 right-0 z-10 h-full w-16 bg-linear-to-l from-white to-transparent dark:from-[#000000AA]' />
          <div className='flex h-full gap-4 overflow-hidden'>
            <div ref={reverseScrollContainerRef} className='flex h-full gap-4'>
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
