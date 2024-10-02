'use client';

import {useEffect, useState} from "react";
import Navbar from "@/app/navbar";

const whoAmIText = [
  "a programmer.",
  "a designer.",
  "an engineer.",
  "a creative thinker."
]

export default function Home() {
  const [whoAmI, setWhoAmI] = useState('');
  const [current, setCurrent] = useState(0);
  const [wait, setWait] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    setTimeout(() => {

      if(direction == 0) {
        if(whoAmI.length == whoAmIText[current].length) {
          if(wait == 5) {
            setWait(0)
            setDirection(1);
          } else setWait(wait+1)
        }
        else
          setWhoAmI(whoAmIText[current].substring(0, whoAmI.length+1));
      } else {
        if(whoAmI.length == 0) {
          setCurrent(current == whoAmIText.length-1 ? 0 : current+1)
          setDirection(0);
        }
        else
          setWhoAmI(whoAmIText[current].substring(0, whoAmI.length-1));
      }

    }, 125)
  }, [whoAmI, current, wait, direction]);

  return (
    <main>
      <Navbar />
      <div className="pl-36 pt-36">
        <h1 className="text-8xl font-semibold">...</h1>
        <h1 className="text-6xl">i am {whoAmI}</h1>
      </div>
      <div className="h-[500rem]"></div>
    </main>
  );
}