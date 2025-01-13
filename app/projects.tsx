import Image from 'next/image';
import { RefObject, useEffect, useState } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

export default function Projects({
  divRef,
}: {
  divRef: RefObject<HTMLDivElement | null>;
}) {
  const [projects, setProjects] = useState<Projects[]>([]);
  const [langlinks, setLanglinks] = useState<any>(null);
  useEffect(() => {
    if (projects.length === 0) {
      fetch('/projects.json', {
        cache: 'force-cache',
      })
        .then((res) => res.json())
        .then((data) => {
          setProjects(data);
        });
    }
    if (!langlinks) {
      fetch('/langlinks.json', {
        cache: 'force-cache',
      })
        .then((res) => res.json())
        .then((data) => {
          setLanglinks(data);
        });
    }
  }, [projects, langlinks]);

  console.log(projects);

  return (
    <div ref={divRef}>
      <h1 className='w-full p-5 text-center text-5xl font-semibold'>
        Projects
      </h1>
      <ResponsiveMasonry
        className='px-8 pt-16'
        columnsCountBreakPoints={{ 350: 1, 750: 2, 800: 3 }}
      >
        <Masonry gutter='1rem'>
          {projects.map((project: Projects) => (
            <ProjectCard
              title={project.title}
              description={project.description}
              langs={project.langs}
              link={project.link}
              langlinks={langlinks}
              source={project.source}
              key={project.title}
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
}

function ProjectCard({
  title,
  description,
  langs,
  link,
  langlinks,
  source,
}: ProjectCardProps) {
  const pageLink = () => {
    if (link != null) {
      return (
        <button className='pr-2' onClick={() => window.open(link)}>
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
    <div className='content-background rounded-2xl px-6 py-4'>
      <div className='flex flex-row justify-between pb-2'>
        <h1 className='whitespace-nowrap text-2xl font-semibold'>{title}</h1>
        <div>
          {pageLink()}
          {sourceLink()}
        </div>
      </div>
      <p>{description}</p>
      <div className='grid grid-cols-6 content-start justify-start gap-x-1 gap-y-1 py-3'>
        {langs.map((lang: string) => {
          if (langlinks == null || langlinks[lang] == null)
            return (
              <Image
                src={`/icons/${lang}.svg`}
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
                  src={`/icons/${lang}.svg`}
                  alt={`${lang}.svg`}
                  height={40}
                  width={40}
                />
              </button>
            );
        })}
      </div>
    </div>
  );
}

interface Projects {
  title: string;
  description: string;
  langs: string[];
  link: string | null;
  source: string | null;
}

interface ProjectCardProps extends Projects {
  langlinks: any;
}
