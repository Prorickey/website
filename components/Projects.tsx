'use client';

import { useEffect, useState } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';

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

      // Initialize with nulls to preserve order
      const ordered: (ProjectMetadata | null)[] = new Array(slugs.length).fill(
        null,
      );

      slugs.forEach(async (slug, index) => {
        const res = await fetch(`/projects/${slug}/metadata.json`);
        const metadata = await res.json();

        const image = metadata.image
          ? `/projects/${slug}/${metadata.image}`
          : null;

        ordered[index] = { ...metadata, slug, image } as ProjectMetadata;
        setProjects(
          ordered.filter((p): p is ProjectMetadata => p !== null),
        );
      });
    }

    loadProjects();

    fetch('/langlinks.json')
      .then((res) => res.json())
      .then((data) => setLanglinks(data));
  }, []);

  if (!isClient || projects.length === 0 || !langlinks) return null;

  return (
    <div id='projects'>
      <h1 className='w-full p-5 text-center text-5xl font-semibold'>
        Projects
      </h1>
      <ResponsiveMasonry
        className='px-2 pt-16 lg:px-8'
        columnsCountBreakPoints={{ 350: 1, 800: 2, 1300: 3 }}
        gutterBreakPoints={{ 350: '1.5rem', 800: '1.5rem', 1300: '1.5rem' }}
      >
        <Masonry>
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              langlinks={langlinks}
              onSelect={() => setSelectedProject(project)}
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          langlinks={langlinks}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
