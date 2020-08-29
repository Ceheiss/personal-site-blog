import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"
import blogStyles from "../pages/blog.module.scss"

export default class BlogList extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges
    return (
      <Layout>
        {console.log("POSTS: ", posts)}
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
