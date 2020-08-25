import React from "react"
import { container, projectImage, projectInfo } from "./Project.module.scss"

const Project = ({ title, image, alt, description }) => {
  return (
    <div className={container}>
      <div className={projectInfo}>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <img className={projectImage} alt={alt} src={image} />
    </div>
  )
}

export default Project
