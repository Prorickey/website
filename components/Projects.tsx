'use client';

import { useEffect, useState } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import TextReveal from './ui/TextReveal';

export interface ProjectMetadata {
  slug: string;
  title: string;
  shortDescription: string;
  langs: string[];
  link: string | null;
  source: string | null;
  date: string;
  image: string | null;
}

const FEATURED_COUNT = 3;

export function Projects() {
  const [projects, setProjects] = useState<ProjectMetadata[]>([]);
  const [langlinks, setLanglinks] = useState<Record<string, string>>({});
  const [isClient, setIsClient] = useState(false);
  const [selectedProject, setSelectedProject] =
    useState<ProjectMetadata | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => setIsClient(true), 0);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    async function loadProjects() {
      const indexRes = await fetch('/projects/index.json');
      const slugs: string[] = await indexRes.json();

      const ordered: (ProjectMetadata | null)[] = new Array(slugs.length).fill(
        null
      );

      slugs.forEach(async (slug, index) => {
        const res = await fetch(`/projects/${slug}/metadata.json`);
        const metadata = await res.json();

        const image = metadata.image
          ? `/projects/${slug}/${metadata.image}`
          : null;

        ordered[index] = { ...metadata, slug, image } as ProjectMetadata;
        setProjects(ordered.filter((p): p is ProjectMetadata => p !== null));
      });
    }

    loadProjects();

    fetch('/langlinks.json')
      .then((res) => res.json())
      .then((data) => setLanglinks(data));
  }, []);

  if (!isClient || projects.length === 0 || !langlinks) return null;

  const rest = projects.slice(FEATURED_COUNT);
  if (rest.length === 0) return null;

  return (
    <section id='projects' className='relative py-28'>
      <div className='mx-auto max-w-6xl px-6 lg:px-10'>
        <span className='text-xs tracking-[0.4em] text-[color:var(--text-muted)] uppercase'>
          04 — More Work
        </span>
        <TextReveal
          as='h2'
          text='Everything else I have shipped.'
          className='mt-4 block pb-[0.12em] text-4xl leading-[1.2] font-semibold text-balance lg:text-6xl'
          stagger={0.05}
        />
      </div>

      <div className='mx-auto mt-16 max-w-6xl px-6 lg:px-10'>
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 350: 1, 800: 2, 1300: 3 }}
          gutterBreakPoints={{ 350: 24, 800: 24, 1300: 24 }}
        >
          <Masonry>
            {rest.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                langlinks={langlinks}
                onSelect={() => setSelectedProject(project)}
              />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          langlinks={langlinks}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
