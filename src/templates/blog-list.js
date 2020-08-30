import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"
import Head from "../components/Head"
import BlogPagination from "../components/BlogPagination"
import BlogCounter from "../components/BlogCounter"
import { postStyle, postsStyle, subHeader } from "./blog.module.scss"

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
        <h2 className={subHeader}>This is my learning blog</h2>
        <BlogCounter />
        <ol className={postsStyle}>
          {posts.map(({ node }, i) => {
            const { title, date } = node.frontmatter
            const { slug } = node.fields
            const { excerpt } = node
            return (
              <li key={i} className={postStyle}>
                <Link to={slug}>
                  <h2>{title}</h2>
                  <p>{date}</p>
                  <p>{excerpt}</p>
                </Link>
              </li>
            )
          })}
        </ol>
        <BlogPagination
          prevPage={prevPage}
          numPages={numPages}
          nextPage={nextPage}
          isFirst={isFirst}
          isLast={isLast}
        />
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
