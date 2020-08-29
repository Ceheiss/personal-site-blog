import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Head from "../components/Head"

const BlogPost = ({ data }) => {
  const post = data.markdownRemark
  return (
    <Layout>
      <Head title={post.frontmatter.title} />
      <div>
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </Layout>
  )
}

// $slug is a query variable, and we define it's type
export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
export default BlogPost
