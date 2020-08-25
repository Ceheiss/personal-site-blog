import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import HeaderStyles from "./Header.module.scss"

const Header = ({ showComplete }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <header className={HeaderStyles.header}>
      {showComplete ? (
        <h1>
          <Link
            className={HeaderStyles.title}
            activeClassName={HeaderStyles.activeNavItem}
            to="/"
          >
            {data.site.siteMetadata.title}
          </Link>
        </h1>
      ) : null}
      <nav>
        <ul className={HeaderStyles.navList}>
          <li>
            <Link
              className={HeaderStyles.navItem}
              activeClassName={HeaderStyles.activeNavItem}
              to="/"
            >
              Home
            </Link>
          </li>
          <li className={HeaderStyles.navItem}>|</li>
          <li>
            <Link
              className={HeaderStyles.navItem}
              activeClassName={HeaderStyles.activeNavItem}
              to="/blog"
            >
              Blog
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
