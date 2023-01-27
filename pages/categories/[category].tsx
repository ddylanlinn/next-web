import { TagSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { allCoreContent } from 'pliny/utils/contentlayer'
import { InferGetStaticPropsType } from 'next'
import { allBlogs } from 'contentlayer/generated'


export async function getStaticPaths() {
  const blogs = allBlogs
  return {
    paths: blogs.map((blog) => ({
      params: {
        category: blog?.categories || '1',
      },
    })),
    fallback: false,
  }
}

export const getStaticProps = async (context) => {
  const categories = context.params.category as string
  const filteredPosts = allCoreContent(
    allBlogs.filter(
      (post) => post.draft !== true && post.categories === categories
    )
  )

  return { props: { posts: filteredPosts, categories } }
}

export default function Category({ posts, categories }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <TagSEO
        title={`${categories} - ${siteMetadata.title}`}
        description={`${categories} categories - ${siteMetadata.author}`}
      />
      <ListLayout posts={posts} title={`Category: ${categories?.toUpperCase()}`} />
    </>
  )
}
