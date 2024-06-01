'use client'
import Image from "next/image";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import {useEffect, useState} from "react";

export default function Home() {
  return (
    <main className="">
      <Title />
      <div className="absolute w-full top-[38%]">
        <Image
          src="/title-waves.svg"
          alt="Title Waves"
          width={900}
          height={600}
          style={{ height: "100%", width: "100%" }}
        />
        <Projects />
      </div>
    </main>
  );
}

function Title() {
  return (
    <div className="flex flex-col h-[50rem]
                   bg-gradient-to-b from-blue-500 to-sky-600">
      <h1 className="text-9xl text-gray-200 font-bold text-center pt-36 pb-10">Trevor Bedson</h1>
      <p className="text-3xl text-gray-200 text-center">16 year old programmer that is looking to change the world</p>
    </div>
  );
}

function Projects() {
  return (
    <div className="min-h-[50rem] bg-gradient-to-b from-[#d72e2e] to-[#D32F2F] pb-10">
      <h1 className="text-8xl text-gray-200 font-bold text-center pt-10 pb-10">Projects</h1>
      <p className="text-2xl text-gray-200 text-center">Here are some of my projects</p>
      <ProjectsCards />
    </div>
  )
}

function ProjectsCards() {

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
        <h1 className="w-full text-center text-4xl font-semibold text-gray-200 pt-10 pb-5">{title}</h1>
        <button onClick={() => window.open(link, "_blank")}>
          {
            <Image
              src="/rocket.svg"
              alt="Launch Icon"
              height={32}
              width={32}/>
          }
        </button>
      </div>
      <p className="text-center text-lg text-gray-200 pb-5">{description}</p>
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

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
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