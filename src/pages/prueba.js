import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/Layout"

export default function Home({ data }) {
  console.log(data)
  return (
    <Layout>
      <div>
        <h1>Amazing Pandas Eating Things</h1>
        <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div key={node.id}>
            <Link to={node.fields.slug}>
              <h3>
                {node.frontmatter.title} <span>— {node.frontmatter.date}</span>
              </h3>
            </Link>
            <p>{node.excerpt}</p>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query BlogPostList($skip: Int! = 0, $limit: Int! = 5) {
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
