import React from "react"
import { Link } from "gatsby"
import Button from "./Button"
import {
  container,
  projectImage,
  projectInfo,
  buttons,
} from "./Project.module.scss"

const Project = ({ title, image, alt, description, liveLink, repoLink }) => {
  return (
    <div className={container}>
      <div className={projectInfo}>
        <h2 style={{ textAlign: "center" }}>{title}</h2>
        <p>{description}</p>
        <div className={buttons}>
          <Button url={liveLink}>Check it Live</Button>
          <Button url={repoLink}>Check it Code</Button>
        </div>
      </div>
      <img className={projectImage} alt={alt} src={image} />
    </div>
  )
}

export default Project
