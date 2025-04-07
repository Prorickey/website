import Image from 'next/image';
import { RefObject, useEffect, useState } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { ProjectCard } from './ProjectCard';

export interface Projects {
    title: string;
    description: string;
    langs: string[];
    link: string | null;
    source: string | null;
    date: string;
  }

export function Projects({
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
