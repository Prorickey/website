'use client';

import Image from 'next/image';
import { ProjectMetadata } from './Projects';
import { motion } from 'framer-motion';
import Magnetic from './ui/Magnetic';
import { LanguageIcons } from './projects/LanguageIcons';

export interface ProjectCardProps {
  project: ProjectMetadata;
  langlinks: Record<string, string>;
  onSelect: () => void;
}

export function ProjectCard({
  project,
  langlinks,
  onSelect,
}: ProjectCardProps) {
  const { title, shortDescription, langs, link, source, date, image } = project;

  const pageLink = () => {
    if (link != null) {
      return (
        <button
          onClick={(e) => {
            e.stopPropagation();
            window.open(link);
          }}
        >
          <Image
            src={'/icons/rocket.svg'}
            alt={'Click to takeoff!'}
            width={32}
            height={32}
          />
        </button>
      );
    }
  };

  const sourceLink = () => {
    if (source != null) {
      return (
        <button
          onClick={(e) => {
            e.stopPropagation();
            window.open(source);
          }}
        >
          <Image
            src={'/icons/github.svg'}
            alt={'Click to visit source!'}
            width={32}
            height={32}
          />
        </button>
      );
    }
  };

  return (
    <motion.div
      whileInView='visible'
      viewport={{ amount: 0.1, once: true }}
      transition={{ ease: 'easeInOut', duration: 0.75 }}
      initial={{ opacity: 0, y: 50 }}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 },
      }}
      className='cursor-pointer'
      onClick={onSelect}
    >
      <Magnetic strength={0.15}>
        <div className='card-border-wrap'>
          <div className='card-border-inner overflow-hidden'>
            {image && (
              <div className='relative aspect-video w-full overflow-hidden rounded-t-2xl'>
                <Image
                  src={image}
                  alt={title}
                  fill
                  loading='lazy'
                  className='object-cover'
                  sizes='(max-width: 800px) 100vw, (max-width: 1300px) 50vw, 33vw'
                />
              </div>
            )}
            <div className='px-6 py-4'>
              <div className='flex flex-row-reverse justify-between gap-x-4 pb-2'>
                <div className='flex flex-row gap-x-3'>
                  {pageLink()}
                  {sourceLink()}
                </div>
                <p className='top-0 text-stone-400'>{date}</p>
              </div>
              <h1 className='text-2xl font-semibold'>{title}</h1>
              <p>{shortDescription}</p>
              <LanguageIcons
                langs={langs}
                langlinks={langlinks}
                columns={6}
                stopPropagation
                className='py-3'
              />
            </div>
          </div>
        </div>
      </Magnetic>
    </motion.div>
  );
}
