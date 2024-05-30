import Image from "next/image";

export default function Home() {
  return (
    <main className="">
      <Title />
      <Image
        src="/title-waves.svg"
        alt="Title Waves"
        width={0}
        height={0}
        style={{ height: "100%", width: "100%" }}
        className="translate-y-[-38%] -z-10"
      />
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
