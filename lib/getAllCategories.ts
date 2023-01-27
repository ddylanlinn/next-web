export function getAllCategories(data) {
  const posts = data
  const categoryCount = {}
  posts.forEach((post) => {
    if (post.categories && post.draft !== true) {
      const formattedCategory = post.categories
      if (formattedCategory in categoryCount) {
        categoryCount[formattedCategory] += 1
      } else {
        categoryCount[formattedCategory] = 1
      }
    }
  })
  return categoryCount
}