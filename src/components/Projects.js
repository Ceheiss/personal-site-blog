import React from "react"
import Project from "./Project"
import { container } from "./Projects.module.scss"

const Projects = () => {
  return (
    <div className={container}>
      <h1>My Projects</h1>
      <Project />
      <Project />
      <Project />
    </div>
  )
}

export default Projects
