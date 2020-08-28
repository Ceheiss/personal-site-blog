const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
// const { paginate } = require("gatsby-awesome-pagination")

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      // where the page is accessed
      path: node.fields.slug,
      // template for the page to create (the component)
      component: path.resolve(`./src/templates/blog.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
      },
    })
  })
}

// exports.createPages = ({ actions, graphql }) => {
//   const { createPage } = actions

//   // Fetch your items (blog posts, categories, etc).
//   const blogPosts = doSomeMagic()

//   // Create your paginated pages
//   paginate({
//     createPage, // The Gatsby `createPage` function
//     items: blogPosts, // An array of objects
//     itemsPerPage: 2, // How many items you want per page
//     pathPrefix: "/blog", // Creates pages like `/blog`, `/blog/2`, etc
//     component: path.resolve("..."), // Just like `createPage()`
//   })
// }
