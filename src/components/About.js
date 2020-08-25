import React from "react"
import {
  container,
  pictureStyle,
  title,
  description,
  content,
} from "./About.module.scss"
import perfil from "../images/perfil.png"

const About = () => {
  return (
    <div className={container}>
      <h1 className={title}>About me</h1>
      <div className={content}>
        <p className={description}>
          The Sword of Elendil was forged anew by Elvish smiths, and on its
          blade was traced a device of seven stars set between the crescent Moon
          and rayed Sun, and about them was written many runes; for Aragorn son
          of Arathorn was going to war upon the marches of Mordor. Very bright
          was that sword when it was made whole again; the light of the sun
          shone redly in it, and the light of the moon shone cold, its edge was
          hard and keen. And Aragorn gave it a new name and called it Andúril,
          Flame of the West.
        </p>
        <img
          className={pictureStyle}
          alt="author in the lake looking handsome lol"
          src={perfil}
        />
      </div>
    </div>
  )
}

export default About
