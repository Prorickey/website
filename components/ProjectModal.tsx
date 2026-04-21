'use client';

import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectMetadata } from './Projects';
import { useProjectDescription } from '@/hooks/useProjectDescription';
import { LanguageIcons } from './projects/LanguageIcons';

interface ProjectModalProps {
  project: ProjectMetadata;
  langlinks: Record<string, string>;
  onClose: () => void;
}

export function ProjectModal({
  project,
  langlinks,
  onClose,
}: ProjectModalProps) {
  const description = useProjectDescription(project.slug);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='fixed inset-0 z-50 flex items-center justify-center p-4'
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className='absolute inset-0 bg-black/70 backdrop-blur-sm' />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ ease: 'easeOut', duration: 0.2 }}
          className='content-background relative z-10 max-h-[85vh] w-full max-w-4xl overflow-y-auto rounded-2xl'
          onClick={(e) => e.stopPropagation()}
        >
          <div className='px-6 py-5'>
            {/* Header */}
            <div className='flex items-start justify-between gap-4'>
              <div>
                <h2 className='text-3xl font-semibold'>{project.title}</h2>
                <p className='mt-1 text-stone-400'>{project.date}</p>
              </div>
              <div className='flex shrink-0 items-center gap-3'>
                {project.link && (
                  <button onClick={() => window.open(project.link!)}>
                    <Image
                      src={'/icons/rocket.svg'}
                      alt={'Visit project'}
                      width={32}
                      height={32}
                    />
                  </button>
                )}
                {project.source && (
                  <button onClick={() => window.open(project.source!)}>
                    <Image
                      src={'/icons/github.svg'}
                      alt={'View source'}
                      width={32}
                      height={32}
                    />
                  </button>
                )}
                <button
                  onClick={onClose}
                  className='ml-2 rounded-lg p-1 text-stone-400 transition-colors hover:bg-white/10 hover:text-white'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <line x1='18' y1='6' x2='6' y2='18' />
                    <line x1='6' y1='6' x2='18' y2='18' />
                  </svg>
                </button>
              </div>
            </div>

            {/* Image + Description */}
            <div className='mt-4'>
              {project.image && (
                <div className='relative mr-5 mb-3 aspect-video w-full overflow-hidden rounded-xl sm:float-left sm:mb-2 sm:w-3/5'>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    loading='lazy'
                    className='object-cover'
                    sizes='(max-width: 640px) 100vw, 540px'
                  />
                </div>
              )}
              {description === null ? (
                <p className='text-stone-400'>Loading...</p>
              ) : (
                <p className='leading-relaxed'>{description}</p>
              )}
            </div>

            {/* Languages */}
            <LanguageIcons
              langs={project.langs}
              langlinks={langlinks}
              columns={8}
              className='clear-left mt-5'
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
