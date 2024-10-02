import styles from "@/app/navbar.module.css";

export default function Navbar() {
  return (
    <div className={"sticky top-0 w-full bg-[#171717]"}>
      <div className={"w-full " + styles.nav + " " + (window.scrollY > 5 ? styles.navAdded : styles.navRemoved)}>
        <div className="flex items-center justify-between p-5 pr-10">
          <p className={"inline text-nowrap text-2xl font-semibold " + (window.scrollY < 5 ? "hidden" : "")}>Trevor Bedson</p>
          <div className="flex flex-row w-full justify-end gap-x-10 text-lg">
            <a>About</a>
            <a>Projects</a>
            <a>Contact Me</a>
          </div>
        </div>
      </div>
    </div>
  )
}