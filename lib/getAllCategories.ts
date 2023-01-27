export async function getAllCategories(data) {
  const blogs = data
  const categoryCount = {}
  blogs.forEach((blog) => {
    if (blog.categories && blog.draft !== true) {
      const formattedCategory = blog.categories
      if (formattedCategory in categoryCount) {
        categoryCount[formattedCategory] += 1
      } else {
        categoryCount[formattedCategory] = 1
      }
    }
  })
  return categoryCount
}