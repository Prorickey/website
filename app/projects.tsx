import { useEffect, useState } from 'react';

export default function Projects() {
  return (
    <div>
      <p className='w-full p-10 text-center text-5xl font-semibold'>Projects</p>
      <div className="grid w-full grid-cols-3 gap-4 px-20">
        <ProjectCard name={'Personal Website'} id={'personal-website'} url={'https://github.com/Prorickey/website'} />
      </div>
    </div>
  )
}

function ProjectCard({ name, id, url }: { name: string, id: string, url: string | null }) {

  const [description, setDescription] = useState<string>('');
  
  useEffect(() => {
    fetch("/projects/" + id + ".txt").then((res) => res.text()).then((text) => {
      setDescription(text);
    });
  }, [description, id]);
  
  return (
    <div className="">
      <h1>{name}</h1>
      <p>{description}</p>
    </div>
  )
}