import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"
import Head from "../components/Head"
import BlogCounter from "../components/BlogCounter"
import blogStyles from "./blog.module.scss"

export default class BlogList extends React.Component {
  render() {
    const { currentPage, numPages } = this.props.pageContext
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPage = currentPage - 1 === 1 ? "/" : (currentPage - 1).toString()
    const nextPage = (currentPage + 1).toString()
    const posts = this.props.data.allMarkdownRemark.edges
    return (
      <Layout>
        <Head title="Blog" />
        <h2>This is my learning blog</h2>
        <BlogCounter />
        {console.log("POSTS: ", posts)}
        <ol className={blogStyles.posts}>
          {posts.map(({ node }, i) => {
            const { title, date } = node.frontmatter
            const { slug } = node.fields
            const { excerpt } = node
            return (
              <li key={i} className={blogStyles.post}>
                <Link to={slug}>
                  <h2>{title}</h2>
                  <p>{date}</p>
                  <p>{excerpt}</p>
                </Link>
              </li>
            )
          })}
        </ol>
        <div className={blogStyles.blogPagination}>
          {!isFirst && (
            <Link to={`/blog/${prevPage}`} rel="prev">
              ← Previous Page
            </Link>
          )}
          {Array.from({ length: numPages }, (_, i) => (
            <Link
              key={`pagination-number${i + 1}`}
              to={`/blog/${i === 0 ? "" : i + 1}`}
            >
              {i + 1}
            </Link>
          ))}
          {!isLast && (
            <Link to={`/blog/${nextPage}`} rel="next">
              Next Page →
            </Link>
          )}
        </div>
      </Layout>
    )
  }
}
export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`
