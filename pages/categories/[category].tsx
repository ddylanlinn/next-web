import { TagSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { getAllTags, allCoreContent } from 'pliny/utils/contentlayer'
import { InferGetStaticPropsType } from 'next'
import { allBlogs } from 'contentlayer/generated'

export async function getStaticPaths() {
  const categories = allBlogs
  return {
    paths: Object.keys(categories).map((category) => ({
      params: {
        category,
      },
    })),
    fallback: false,
  }
}

export const getStaticProps = async (context) => {
  const categories = context.params.category as string
  const filteredPosts = allCoreContent(
    allBlogs.filter(
      (post) => post.draft !== true && post.categories
    )
  )

  return { props: { posts: filteredPosts, categories } }
}

export default function Category({ posts, categories }: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log('🚀 ~ Tag ~ posts', posts)
  console.log('🚀 ~ Tag ~ categories', categories)
  return (
    <>
      edwed
      {/* <TagSEO
        title={`${category} - ${siteMetadata.title}`}
        description={`${category} category - ${siteMetadata.author}`}
      /> */}
      {/* <ListLayout posts={posts} title={category} /> */}
    </>
  )
}
