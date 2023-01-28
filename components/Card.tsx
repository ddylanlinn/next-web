import Image from './Image'
// import Link from './Link'
import Link from '@/components/Link'
import { formatDate } from 'pliny/utils/formatDate'
import siteMetadata from '@/data/siteMetadata'

const Card = ({ title, description, imgSrc, href, date, type, categories }) => {
  return (
    <div className='h-50 w-full p-4 sm:w-1/2 md:w-1/3'>
      <div className='h-full w-full overflow-hidden rounded-md'>
        <Link href={`/${type.toLowerCase()}/${href}`} aria-label={`Link to ${title}`} className='relative h-full w-full'>
          <div className='absolute bg-gray-500/50 rounded text-xs px-2 py-1 text-black'>{categories?.toUpperCase()}</div>
          <Image
            alt={title}
            src={imgSrc || '/static/images/time-machine.jpg'}
            className='object-cover object-center h-50 w-full sm:h-40 lg:h-60'
            width={600}
            height={400}
          />
        </Link>
        <div className='flex h-40 flex-col justify-between py-2'>
          <div className=''>
            <h2 className=' overflow-y-hidden text-ellipsis text-xl font-bold leading-6 tracking-tight line-clamp-2'>
              <Link href={`/${type.toLowerCase()}/${href}`} aria-label={`Link to ${title}`}>
                {title}
              </Link>
            </h2>
            <p className=' max-w-none overflow-y-hidden text-ellipsis text-gray-500 line-clamp-3 dark:text-gray-400'>
              {description}
            </p>
          </div>

          <div className='flex justify-between'>
            <time
              className='text-base font-medium leading-6 text-gray-500 dark:text-gray-400'
              dateTime={date}
            >
              {formatDate(date, siteMetadata.locale)}
            </time>
            <Link
              href={`/${type.toLowerCase()}/${href}`}
              className='text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'
              aria-label={`Link to ${title}`}
            >
              Learn more &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
