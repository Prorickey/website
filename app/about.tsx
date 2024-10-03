import Image from "next/image";
import {MutableRefObject} from "react";

export default function AboutMe({ divRef }: { divRef: MutableRefObject<HTMLDivElement | null> }) {
  return (
    <div ref={divRef}>
      <div className="w-full bg-[#db4c4c] h-[0.1rem]"></div>
      <p className="w-full text-center text-5xl font-semibold p-10">About Me</p>
      <div className="flex flex-row w-full">
        <div className="w-full px-20 text-xl">
          <p>Cookies are a beloved treat that come in various forms, from crunchy to
            soft. The most iconic type is the chocolate chip cookie, invented by Ruth
            Wakefield in the 1930s. Ingredients like flour, sugar, and butter are
            essential in determining their texture and flavor. Cookies have a long
            history, originating in 7th-century Persia and evolving across cultures.
            Today, they are enjoyed globally in many different varieties and styles.</p>
        </div>
        <div className="w-full px-20 flex flex-row gap-4">
          <div className="w-full flex flex-col py-14 gap-4">
            <KnowCard name={"HTML"} id={"html"} url={null}/>
            <KnowCard name={"Next.js"} id={"nextjs"} url={"https://nextjs.org/"}/>
            <KnowCard name={"Git"} id={"git"} url={"https://git-scm.com/"}/>
          </div>
          <div className="w-full flex flex-col gap-4">
            <KnowCard name={"CSS"} id={"css"} url={null}/>
            <KnowCard name={"TailwindCSS"} id={"tailwindcss"} url={"https://tailwindcss.com/"}/>
            <KnowCard name={"Redis"} id={"redis"} url={"https://redis.io/"}/>
            <KnowCard name={"Kubernetes"} id={"kubernetes"} url={"https://kubernetes.io/"}/>
          </div>
          <div className="w-full flex flex-col py-14 gap-4">
            <KnowCard name={"Javascript"} id={"javascript"} url={null}/>
            <KnowCard name={"Node.js"} id={"nodejs"} url={"https://nodejs.org/"}/>
            <KnowCard name={"MongoDB"} id={"mongodb"} url={"https://www.mongodb.com/"}/>
            <KnowCard name={"Docker"} id={"docker"} url={"https://www.docker.com/"}/>
          </div>
          <div className="w-full flex flex-col gap-4">
            <KnowCard name={"Typescript"} id={"typescript"} url={"https://www.typescriptlang.org/"}/>
            <KnowCard name={"Java"} id={"java"} url={"https://www.java.com/"}/>
            <KnowCard name={"MySQL"} id={"mysql"} url={"https://www.mysql.com/"}/>
            <KnowCard name={"Linux"} id={"linux"} url={null}/>
          </div>
          <div className="w-full flex flex-col py-14 gap-4">
            <KnowCard name={"React"} id={"react"} url={"https://react.dev/"}/>
            <KnowCard name={"Python"} id={"python"} url={"https://www.python.org/"}/>
            <KnowCard name={"Postgresql"} id={"postgresql"} url={"https://www.postgresql.org/"}/>
          </div>
        </div>
      </div>
    </div>
  )
}

function KnowCard({name, id, url}: { name: string, id: string, url: string | null }) {
  return (
    <button
      className="flex flex-col border-2 border-[#db4c4c] rounded-lg"
      onClick={url ? () => window.open(url) : undefined}
      style={{pointerEvents: (url ? "auto" : "none")}}
    >
      <Image
        src={`/knows/${id}.svg`}
        alt={id}
        width={75}
        height={75}
        className="self-center p-2"
      />
      <p className="w-full text-center text-lg">{name}</p>
    </button>
  )
}