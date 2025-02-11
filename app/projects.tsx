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
    fetch('/projects.json')
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
      });

    fetch('/langlinks.json')
      .then((res) => res.json())
      .then((data) => {
        setLanglinks(data);
      });
  }, []);

  return (
    <div ref={divRef}>
      <h1 className='w-full p-5 text-center text-5xl font-semibold'>
        Projects
      </h1>
      <ResponsiveMasonry
        className='px-2 pt-16 lg:px-8'
        columnsCountBreakPoints={{ 350: 1, 800: 2, 1300: 3 }}
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
              date={project.date}
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
    <div className="content-background rounded-2xl px-6 py-4">
      <div className="flex flex-row-reverse justify-between gap-x-4 pb-2">
        <div className="flex flex-row gap-x-2">
          {pageLink()}
          {sourceLink()}
        </div>
        <p className="text-stone-400 top-0">{date}</p>
      </div>
      <h1 className="text-2xl font-semibold whitespace-nowrap">{title}</h1>
      <p>{description}</p>
      <div className="grid grid-cols-6 content-start justify-start gap-x-1 gap-y-4 py-3">
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
    </div>
  );
}

interface Projects {
  title: string;
  description: string;
  langs: string[];
  link: string | null;
  source: string | null;
  date: string
}

interface ProjectCardProps extends Projects {
  langlinks: any;
}
