import Link from './Link'
import siteMetadata from '@/data/siteMetadata'

export default function Footer() {
  return (
    <footer>
    
        <div className='mb-5 mt-20 flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400'>
          <Link href='/'>{siteMetadata.title}</Link>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <Link href='https://github.com/timlrx/tailwind-nextjs-starter-blog'>Tailwind Nextjs</Link>
        </div>
    </footer>
  )
}
