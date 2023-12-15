import React from "react"
import {
  container,
  pictureStyle,
  title,
  description,
  content,
  text,
} from "./About.module.scss"
import { Link } from "gatsby"
import Button from "./Button"
import perfil from "../images/perfil.png"
import cv from "../../static/cvHeiss.pdf"

const About = () => {
  return (
    <div className={container}>
      <h1 className={title}>About me</h1>
      <div className={content}>
        <div className={text}>
          <div className={description}>
            <p>
              I'm a Software Developer based in Munich that likes to write in{" "}
              <strong>Javascript</strong>. My <strong>aim</strong> is to create
              code that is readable, clean, and with short immutable functions
              when possible.
            </p>
            <p>
              Frameworks are nice, but I like to spend a lot of time with
              <strong> 'VanillaJS'</strong> to understand what is going on. That being,
                I have experience working with <strong>React</strong>, <strong>Next.JS</strong> and some
                  bits and bytes of <strong> Node/Express</strong> as well.
            </p>
            <p>
              Currently working on Global Savings Group, moving between Design Systems, building POCs,
              and tweaking thinngs. Oh, and here is my{" "}
              <Link
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontWeight: "bold",
                }}
                to="/blog"
              >
                blog
              </Link>
              .
            </p>
          </div>
          <Button url={cv} btnStyle="dark">
            Check my CV
          </Button>
        </div>
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
