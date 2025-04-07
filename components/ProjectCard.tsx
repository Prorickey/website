import Image from 'next/image';
import { Projects } from './Projects';
import { motion } from 'framer-motion';

export interface ProjectCardProps extends Projects {
    langlinks: any;
}

export function ProjectCard({
    title,
    description,
    langs,
    link,
    langlinks,
    source,
    date
  }: ProjectCardProps) {
    const pageLink = () => {
      if (link != null) {
        return (
          <button onClick={() => window.open(link)}>
            <Image
              src={'/rocket.svg'}
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
          <button onClick={() => window.open(source)}>
            <Image
              src={'/github.svg'}
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
        whileInView="visible"
        viewport={{ amount: 0.1, once: true }}
        transition={{ ease: "easeInOut", duration: 0.75 }}
        initial={{ opacity: 0, y: 50 }}
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: 50 }
        }}
        className='content-background rounded-2xl px-6 py-4'>
        <div className='flex flex-row-reverse justify-between gap-x-4 pb-2'>
          <div className='flex flex-row gap-x-2'>
            {pageLink()}
            {sourceLink()}
          </div>
          <p className='top-0 text-stone-400'>{date}</p>
        </div>
        <h1 className='text-2xl font-semibold'>{title}</h1>
        <p>{description}</p>
        <div className='grid grid-cols-6 content-start justify-start gap-x-1 gap-y-4 py-3'>
          {langs.map((lang: string) => {
            if (langlinks == null || langlinks[lang] == null)
              return (
                <Image
                  src={`/knows/${lang}.svg`}
                  alt={`${lang}.svg`}
                  height={40}
                  width={40}
                  key={lang}
                />
              );
            else
              return (
                <button
                  onClick={() => window.open(langlinks[lang], '_blank')}
                  key={lang}
                >
                  <Image
                    src={`/knows/${lang}.svg`}
                    alt={`${lang}.svg`}
                    height={40}
                    width={40}
                  />
                </button>
              );
          })}
        </div>
      </motion.div>
    );
  }