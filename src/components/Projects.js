import React from "react"
import Project from "./Project"
import { container, title } from "./Projects.module.scss"
import projects from "../data/projectsData"

const Projects = () => {
  const renderProjects = projects.map(project => (
    <Project
      image={project.image}
      alt={project.alt}
      title={project.title}
      description={project.description}
    />
  ))
  return (
    <div className={container}>
      <h1 className={title}>My Projects</h1>
      {renderProjects}
    </div>
  )
}

export default Projects
