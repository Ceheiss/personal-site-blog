import React from "react"
import { Link } from "gatsby"
import { currentNum, blogPaginationStyle } from "./BlogPagination.module.scss"

const BlogPagination = ({
  currentPage,
  prevPage,
  numPages,
  nextPage,
  isFirst,
  isLast,
}) => {
  return (
    <div className={blogPaginationStyle}>
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
          {i + 1 === currentPage ? (
            <span className={currentNum}>{i + 1}</span>
          ) : (
            <span>{i + 1}</span>
          )}
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
