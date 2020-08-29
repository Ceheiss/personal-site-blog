import React from "react"
import { graphql, useStaticQuery } from "gatsby"

const BlogCounter = () => {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark {
        edges {
          node {
            id
          }
        }
      }
    }
  `)

  const postCount = data.allMarkdownRemark.edges.length
  return (
    <div>
      <h4>{postCount} Posts</h4>
    </div>
  )
}

export default BlogCounter
