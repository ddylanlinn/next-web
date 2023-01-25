import { ReactNode } from 'react'
import type { Authors } from 'contentlayer/generated'
import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'
import { PageSEO } from '@/components/SEO'

interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

export default function AuthorLayout({ children, content }: Props) {
  const { name, avatar, occupation, email } = content

  return (
    <>
      <PageSEO title={`About - ${name}`} description={`About me - ${name}`} />
      <div className='divide-y divide-gray-200 dark:divide-gray-700'>
        <div className='space-y-2 pt-3 pb-4 md:space-y-5'>
          <h1 className='text-3xl font-semibold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-4xl md:leading-14'>
            About
          </h1>
        </div>
        <div className='md:flex-raw items-start space-y-2 md:flex md:space-y-0'>
          <div className='flex flex-col items-center space-x-2 pt-10'>
            <Image
              src={avatar}
              alt='avatar'
              width={192}
              height={192}
              className='h-48 w-48 rounded-full'
            />
            <h3 className='pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight'>{name}</h3>
            <div className='text-gray-500 dark:text-gray-400'>{occupation}</div>
            <div className="flex space-x-3 pt-4">
              <SocialIcon kind="mail" href={`mailto:${email}`} />
            </div>
          </div>
          <div className='prose ml-10 max-w-none py-8 self-center dark:prose-dark md:col-span-2'>
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
