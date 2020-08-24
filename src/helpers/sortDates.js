// This functions is not reusable, it targets very specific data
const sortDates = dateArray =>
  dateArray
    .sort(
      (a, b) =>
        new Date(a.node.frontmatter.date) - new Date(b.node.frontmatter.date)
    )
    .reverse()

export default sortDates
