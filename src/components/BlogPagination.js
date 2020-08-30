import React from "react"
import { Link } from "gatsby"
import blogStyles from "../templates/blog.module.scss"

const BlogPagination = ({ prevPage, numPages, nextPage, isFirst, isLast }) => {
  return (
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
  )
}

export default BlogPagination
