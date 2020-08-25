import React from "react"
import Layout from "../components/Layout"
import Head from "../components/Head"
import { Link, graphql, useStaticQuery } from "gatsby"
import blogStyles from "./blog.module.scss"
import formatDate from "../helpers/formatDate"
import sortDates from "../helpers/sortDates"

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

  const sortedList = sortDates(data.allMarkdownRemark.edges)

  const blogPostsList = sortedList.map((blogPost, i) => {
    const { title, date } = blogPost.node.frontmatter
    const { slug } = blogPost.node.fields
    const { excerpt } = blogPost.node
    return (
      <li key={i} className={blogStyles.post}>
        <Link to={slug}>
          <h2>{title}</h2>
          <p>{formatDate(date)}</p>
          <p>{excerpt}</p>
        </Link>
      </li>
    )
  })

  return (
    <Layout>
      <Head title="Blog" />
      <h1>This is my learning blog</h1>
      <ol className={blogStyles.posts}>{blogPostsList}</ol>
    </Layout>
  )
}

export default BlogPage
