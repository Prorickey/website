'use client';

import { useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';

const EQUILIBRIUM_VELOCITY = -0.35;

const images = [
  { src: '/images/nctsa.png', alt: 'NC TSA' },
  { src: '/images/robotics.jpeg', alt: 'Robotics' },
  { src: '/images/smathhacks.jpg', alt: 'SMath Hacks' },
];

export function ImageCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);

  const velocityRef = useRef(EQUILIBRIUM_VELOCITY);
  const offsetRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animate = () => {
      velocityRef.current = EQUILIBRIUM_VELOCITY;

      const imageWidth = 632; // width + gap
      const totalWidth = images.length * imageWidth;

      if (offsetRef.current <= -totalWidth) {
        offsetRef.current = 0;
      }
      offsetRef.current += velocityRef.current;

      if (scrollContainerRef.current) {
        scrollContainerRef.current.style.transform = `translateX(${offsetRef.current}px)`;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const duplicatedImages = useMemo(() => [...images, ...images, ...images], []);

  return (
    <div ref={containerRef} className='relative w-full overflow-hidden py-10'>
      <div className='relative h-[300px] w-full md:h-[350px]'>
        <div className='pointer-events-none absolute top-0 left-0 z-10 h-full w-32 bg-linear-to-r from-white to-transparent md:w-48 dark:from-black' />
        <div className='pointer-events-none absolute top-0 right-0 z-10 h-full w-32 bg-linear-to-l from-white to-transparent md:w-48 dark:from-black' />
        <div className='flex h-full gap-8'>
          <div ref={scrollContainerRef} className='flex h-full gap-8'>
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
    </div>
  );
}
