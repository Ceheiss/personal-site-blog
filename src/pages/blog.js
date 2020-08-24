import React from "react"
import Layout from "../components/Layout"
import { Link, graphql, useStaticQuery } from "gatsby"
import blogStyles from "./blog.module.scss"

const BlogPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              title
              date
            }
            fields {
              slug
            }
            html
            excerpt
          }
        }
      }
    }
  `)

  const blogPostsList = data.allMarkdownRemark.edges.map((blogPost, i) => {
    const { title, date } = blogPost.node.frontmatter
    const { slug } = blogPost.node.fields
    return (
      <li key={i} className={blogStyles.post}>
        <Link to={slug}>
          <h2>{title}</h2>
          <p>{date}</p>
        </Link>
      </li>
    )
  })

  return (
    <Layout>
      <h1>My Blog</h1>
      <ol className={blogStyles.posts}>{blogPostsList}</ol>
    </Layout>
  )
}

export default BlogPage
