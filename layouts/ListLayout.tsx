import { useState } from 'react'
import { useRouter } from 'next/router'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Coding } from 'contentlayer/generated'
import Link from '@/components/Link'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import Category from '@/components/Category'
import siteMetadata from '@/data/siteMetadata'
import { getAllCategories } from '../lib/getAllCategories'
import { allBlogs, allCodings } from 'contentlayer/generated'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Blog | Coding>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog | Coding>[]
  pagination?: PaginationProps
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const router = useRouter()
  const basePath = router.pathname.split('/')[1]
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className='space-y-2 pt-6 pb-8 md:space-y-5'>
      <nav className='flex justify-center'>
        {!prevPage && (
          <button className='cursor-auto disabled:opacity-50' disabled={!prevPage}>
            &lt;--
          </button>
        )}
        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel='prev'
          >
            &lt;--
          </Link>
        )}
        <span className='mx-2'>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button className='cursor-auto disabled:opacity-50' disabled={!nextPage}>
            --&gt;
          </button>
        )}
        {nextPage && (
          <Link href={`/${basePath}/page/${currentPage + 1}`} rel='next'>
            --&gt;
          </Link>
        )}
      </nav>
    </div>
  )
}

export default function ListLayout({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const [searchValue, setSearchValue] = useState('')
  const filteredBlogPosts = posts.filter((post) => {
    const searchContent = post.title + post.summary + post.tags.join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  // If initialDisplayPosts exist, display it if no searchValue is specified
  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts

  const router = useRouter()
  const urlCategory = router.query.category
  const displayCategories = title.slice(0, 3) !== 'Tag'

  const blogCategories = ['travel', 'inspired', 'camino', 'life', 'thought']
  const codingCategories = ['guide']

  const pathName = router.pathname
  
  let postFrom
  if (pathName === '/categories/[category]') {
    const category = pathName === '/categories/[category]' && router.query.category
    const blogCategory= blogCategories.some(item => category.includes(item))
    const codingCategory = codingCategories.some(item => category.includes(item))
    if (blogCategory) postFrom = allBlogs
    if (codingCategory) postFrom = allCodings
  } else if (pathName === '/blog') {
    postFrom = allBlogs
  } else if (pathName === '/coding') {
    postFrom = allCodings
  }  

  const categories = getAllCategories(postFrom)
  const sortedCategories = categories && Object.keys(categories).sort((a, b) => categories[b] - categories[a])

  return (
    <>
      <div className='space-y-2 pb-4 md:space-y-5'>
        <h1 className='text-center text-3xl font-semibold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:leading-10 md:text-4xl md:leading-14'>
          {title}
        </h1>
        {displayCategories && (
          <div className='flex justify-center'>
            {sortedCategories?.map((category) => {
              return (
                <div key={category} className='mb-2 mr-3'> 
                  <Category text={category} />
                  {/* <Link
                    href={`/categories/${category}`}
                    className='-ml-2 text-sm font-semibold uppercase text-gray-600 dark:text-gray-300'
                    aria-label={`View posts categories ${category}`}
                  >
                    {` (${categories[category]})`}
                  </Link> */}
                  {urlCategory === category && (
                    <div className='w-full border-t-2 border-primary-500 hover:border-primary-600 dark:hover:border-primary-400' />
                  )}
                </div>
              )
            })}
          </div>
        )}
        <div className='relative'>
          <label>
            <span className='sr-only'>Search articles</span>
            <input
              aria-label='Search articles'
              type='text'
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder='Search articles'
              className='block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100'
            />
          </label>
          <svg
            className='absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            />
          </svg>
        </div>
      </div>
      <ul>
        {!filteredBlogPosts.length && 'No posts found.'}
        {displayPosts.map((post) => {
          const { path, date, title, summary, images, categories } = post
          return (
            <article key={path} className='md:h-50 w-full my-5 flex h-full flex-col md:flex-row'>
              <Image
                alt={images?.[0] || '/static/images/time-machine.jpg'}
                src={images?.[0] || '/static/images/time-machine.jpg'}
                width={300}
                height={300}
                className='h-64 w-full sm:h-72 md:w-60 md:h-40 lg:h-60 lg:w-80 self-center rounded-sm object-cover object-center'
              />
              <div className='flex h-auto w-full flex-col justify-between md:ml-2'>
                <div>
                  <h3 className='mt-2 text-xl font-bold leading-8 tracking-tight sm:mt-0 sm:text-2xl'>
                    <Link href={`/${path}`} className='text-gray-900 dark:text-gray-100'>
                      {title}
                    </Link>
                  </h3>
                  <div className='mt-2 flex flex-wrap'>
                    <Category text={categories} />
                  </div>
                  <div className='overflow-y-hidden text-ellipsis text-gray-500 line-clamp-3 dark:text-gray-400 '>
                    {summary}
                  </div>
                </div>
                <time
                  className='self-end text-base font-medium leading-6 text-gray-500 dark:text-gray-400'
                  dateTime={date}
                >
                  {formatDate(date, siteMetadata.locale)}
                </time>
              </div>
            </article>
          )
        })}
      </ul>

      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </>
  )
}

