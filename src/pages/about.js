import React from "react"
import { Link } from "gatsby"
import Layout from "../components/Layout"

const AboutPage = () => {
  return (
    <Layout>
      <h1>Hi, my name is Cristobal</h1>
      <p>
        I'm a developer based in Munich. Javascript is my thing, but I'm also
        learning Python and basic electronics (mainly with Arduino).
      </p>
      <p>
        I prefer Front End, but I've done some things in Node/Express and it's
        quite interesting
      </p>
      <Link to="/contact">Talk to me</Link>
    </Layout>
  )
}

export default AboutPage
