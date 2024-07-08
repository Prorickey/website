import Image from "next/image";
import ProjectsCards from "@/app/projectcards";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Title />
      <div className="relative w-full top-[-30rem] mb-[-30rem] xl:top-[-40rem] xl:mb-[-40rem]">
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
    <div
      className="flex flex-col h-[50rem]
                   bg-gradient-to-b from-blue-500 to-sky-600"
    >
      <h1 className="text-7xl md:text-9xl text-gray-200 font-bold text-center pt-20 md:pt-32 pb-10">
        Trevor Bedson
      </h1>
      <p className="text-xl md:text-3xl text-gray-200 text-center">
        16 year old programmer that is looking to change the world
      </p>
    </div>
  );
}

function Projects() {
  return (
    <div className="min-h-[50rem] bg-gradient-to-b from-[#d72e2e] to-[#D32F2F] pb-10">
      <h1 className="text-6xl md:text-8xl text-gray-200 font-bold text-center pt-10 pb-10">
        Projects
      </h1>
      <p className="text-xl md:text-2xl text-gray-200 text-center">
        Here are some of my projects
      </p>
      <ProjectsCards />
    </div>
  );
}
