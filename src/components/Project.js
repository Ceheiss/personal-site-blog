import React from "react"
import { container, projectImage } from "./Project.module.scss"

const Project = () => {
  return (
    <div className={container}>
      <div>
        <h1>I'm a project</h1>
      </div>
      <div className={projectImage}>holi</div>
    </div>
  )
}

export default Project
