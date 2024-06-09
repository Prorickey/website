'use client'
import {useEffect, useState} from "react";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import Image from "next/image";

export default function ProjectsCards() {

  const [projects, setProjects] = useState<Projects[]>([]);
  const [langlinks, setLanglinks] = useState<any>([]);
  useEffect(() => {
    fetch("/projects.json")
      .then(res => res.json())
      .then(data => {
        setProjects(data);
      })
    fetch("/langlinks.json")
      .then(res => res.json())
      .then(data => {
        setLanglinks(data);
      })
  }, [])

  return (
    <ResponsiveMasonry className="pt-16 px-8"
                       columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}>
      <Masonry gutter="1rem">
        {
          projects.map((project: Projects) => (
            // eslint-disable-next-line react/jsx-key
            <ProjectCard title={project.title} description={project.description} langs={project.langs} link={project.link} langlinks={langlinks} />
          ))
        }
      </Masonry>
    </ResponsiveMasonry>
  )
}

function ProjectCard({ title, description, langs, link, langlinks }: ProjectCardProps) {

  return (
    <div className={"flex flex-col w-full rounded-lg bg-neutral-600 pr-10 pl-10"}>
      <div className="flex flex-row">
        <h1 className="grow w-full text-4xl font-semibold text-gray-200 pt-10 pb-5">{title}</h1>
        <button onClick={ () => {
          if (link == "http://localhost:3000") window.scrollTo({top: 0, behavior: 'smooth'})
          else window.open(link, "_blank")
        }}>
          {
            <Image
              src="/rocket.svg"
              alt="Launch Icon"
              height={32}
              width={32}/>
          }
        </button>
      </div>
      <p className="text-lg text-gray-200 pb-5">{description}</p>
      <div className="grid justify-start content-start grid-cols-10 gap-x-1 gap-y-1 pb-5">
        {
          langs.map((lang: string) => {
            if(langlinks[lang] == null) return (
              // eslint-disable-next-line react/jsx-key
              <Image
                src={`/icons/${lang}.svg`}
                alt={`${lang}.svg`}
                height={40}
                width={40}
              />
            )
            else return (
              // eslint-disable-next-line react/jsx-key
              <button onClick={() => window.open(langlinks[lang], "_blank")}>
                <Image
                  src={`/icons/${lang}.svg`}
                  alt={`${lang}.svg`}
                  height={40}
                  width={40}
                />
              </button>
            )
          })
        }
      </div>
    </div>
  )
}

interface Projects {
  title: string
  description: string
  langs: string[]
  link: string
}

interface ProjectCardProps extends Projects {
  langlinks: any
}