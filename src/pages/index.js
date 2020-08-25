import React from "react"
import Header from "../components/Header"
import Head from "../components/Head"
import Footer from "../components/Footer"
import Presentation from "../components/Presentation"
import About from "../components/About"
import Projects from "../components/Projects"
import { container } from "./index.module.scss"

const indexPage = () => {
  return (
    <div className={container}>
      <Head title="Home" />
      <Presentation />
      <Header />
      <About />
      <Projects />
      <Footer id="about" />
    </div>
  )
}

export default indexPage
