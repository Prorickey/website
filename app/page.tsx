'use client'
import Image from "next/image";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"

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
      <ResponsiveMasonry className="pt-16 px-8"
        columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}>
        <Masonry gutter="1rem">
          <ProjectCard title="Project 1" height={10} />
          <ProjectCard title="Project 2" height={50} />
          <ProjectCard title="Project 3" height={20} />
          <ProjectCard title="Project 4" height={50} />
          <ProjectCard title="Project 5" height={20} />
        </Masonry>
      </ResponsiveMasonry>
    </div>
  )
}

function ProjectCard({ title, height }: ProjectCardProps) {
  return (
    <div className={"flex flex-row w-full rounded-lg bg-neutral-600 pr-10 pl-10"} style={{height: `${height}rem`}}>
      <h1 className="w-full text-center text-3xl font-semibold text-gray-200 pt-10">{title}</h1>
    </div>
  )
}

interface ProjectCardProps {
  title: string
  height: number
}