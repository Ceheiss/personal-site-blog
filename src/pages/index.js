import React from "react"
import Header from "../components/Header"
import Presentation from "../components/Presentation"
import About from "../components/About"
import Projects from "../components/Projects"
import { container } from "./index.module.scss"

const indexPage = () => {
  return (
    <div className={container}>
      <Presentation />
      <Header />
      <About />
      <Projects />
    </div>
  )
}

export default indexPage
