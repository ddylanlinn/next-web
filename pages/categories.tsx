import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import Category from '@/components/Category'
import siteMetadata from '@/data/siteMetadata'
import { getAllTags } from 'pliny/utils/contentlayer'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { allBlogs } from 'contentlayer/generated'
import {getAllCategories} from '../lib/getAllCategories'

export const getStaticProps: GetStaticProps<{ categories: Record<string, number> }> = async () => {
  const categories = await getAllCategories(allBlogs)
  return { props: { categories } }
}

export default function Categories({ categories }: InferGetStaticPropsType<typeof getStaticProps>) {
  const sortedCategories = Object.keys(categories).sort((a, b) => categories[b] - categories[a])
  return (
    <>
      <PageSEO title={`Categories - ${siteMetadata.author}`} description='Things I blog about' />
      <div className='flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0'>
        <div className='space-x-2 pt-6 pb-8 md:space-y-5'>
          <h1 className='text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14'>
            Categories
          </h1>
        </div>
        <div className='flex max-w-lg flex-wrap'>
          {Object.keys(categories).length === 0 && 'No categories found.'}
          {sortedCategories.map((c) => {
            return (
              <div key={c} className='mt-2 mb-2 mr-5'>
                <Category text={c} />
                <Link
                  href={`/categories/${c}`}
                  className='-ml-2 text-sm font-semibold uppercase text-gray-600 dark:text-gray-300'
                  aria-label={`View posts categories ${c}`}
                >
                  {` (${categories[c]})`}
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
