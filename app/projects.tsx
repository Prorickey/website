import Image from 'next/image'
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
    <div className="content-background py-4 px-6 rounded-2xl">
      <div className="flex flex-row justify-between pb-2">
        <h1 className="text-2xl font-semibold">{name}</h1>
        <button onClick={url ? () => window.open(url) : undefined}>
          <Image
            src={"/rocket.svg"}
            alt={"Click to takeoff!"}
            width={32}
            height={32}
          />
        </button>
      </div>
      <p>{description}</p>
    </div>
  )
}