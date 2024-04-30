'use client';
import css from "./page.module.css";

export default function Home() {
  return (
    <main>
      <Introduction />
    </main>
  );
}

function Introduction() {
  return (
    <div className="w-full py-36 bg-gradient-to-br from-red-500 via-orange-600 to-amber-500 
    flex flex-col">
      <p className="text-center pb-5 text-9xl font-sans font-bold tracking-wide">Trevor Bedson</p>
      <p className="text-center pt-5">test</p>
    </div>
  );
}