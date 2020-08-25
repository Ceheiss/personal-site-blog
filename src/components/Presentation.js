import React from "react"
import { title, impactWord, container } from "./Presentation.module.scss"

const Presentation = () => {
  return (
    <div className={container}>
      <h1 className={title}>
        Hi, I'm{" "}
        <span className={impactWord}>
          Cristobal Heiss
          <br />
        </span>{" "}
        I build
        <span className={impactWord}>Javascript</span> things
      </h1>
    </div>
  )
}

export default Presentation
