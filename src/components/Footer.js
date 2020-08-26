import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import { footer, footerFab } from "./Footer.module.scss"

const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          author
        }
      }
    }
  `)

  return (
    <footer className={footer}>
      <p>Developed by {data.site.siteMetadata.author} </p>
      <Link to="https://www.freecodecamp.org/ceheiss" target="_blank">
        <i className={`${footerFab} fab fa-free-code-camp`}></i>
      </Link>{" "}
      <Link to="https://github.com/Ceheiss" target="_blank">
        <i className={`${footerFab} fab fa-github`}></i>
      </Link>{" "}
      <Link to="https://twitter.com/cristobalheiss" target="_blank">
        <i className={`${footerFab} fab fa-twitter`}></i>
      </Link>{" "}
      <Link to="https://www.codepen.io/ceheiss" target="_blank">
        <i className={`${footerFab} fab fa-codepen`}></i>
      </Link>
    </footer>
  )
}

export default Footer
