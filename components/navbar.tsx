import styles from "@/styles/navbar.module.css";
import {MutableRefObject, useEffect, useState} from "react";

export default function Navbar({ navbarRef, aboutRef }: { navbarRef: MutableRefObject<HTMLDivElement | null>, aboutRef: MutableRefObject<HTMLDivElement | null> }) {
  const [showName, setShowName] = useState(false);
  const [navOffset, setNavOffset] = useState(0);

  const onscroll = () => {
    if(window.scrollY > 5) setShowName(true);
    else setShowName(false);
  }

  useEffect(() => {
    if(navbarRef.current) setNavOffset(navbarRef.current.getBoundingClientRect().height);
    window.addEventListener("scroll", onscroll)
    return () => window.removeEventListener("scroll", onscroll)
  }, [navOffset, navbarRef]);

  return (
    <div className={"sticky top-0 w-full bg-[#171717]"} ref={navbarRef}>
      <div className={"w-full " + styles.nav + " " + (showName ? styles.navAdded : styles.navRemoved)}>
        <div className="flex items-center justify-between p-5 pr-10">
          <p className={"inline text-nowrap text-2xl font-semibold " + (showName ? "" : "hidden")}>Trevor Bedson</p>
          <div className="flex flex-row w-full justify-end gap-x-10 text-lg">
            <NavbarItem text={"About"} offset={(aboutRef.current ? aboutRef.current.offsetTop : 0) - navOffset} />
            <NavbarItem text={"Projects"} offset={(aboutRef.current ? aboutRef.current.offsetTop : 0) - navOffset} />
            <NavbarItem text={"Contact Me"} offset={(aboutRef.current ? aboutRef.current.offsetTop : 0) - navOffset} />
          </div>
        </div>
      </div>
    </div>
  )
}

function NavbarItem({text, offset}: {text: string, offset: number}) {
  return (
    <button onClick={() => window.scrollTo({top: offset, behavior: "smooth"})}>
      <p>{text}</p>
    </button>
  )
}