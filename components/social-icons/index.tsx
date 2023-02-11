import Mail from './mail.svg'
import Github from './github.svg'
import Facebook from './facebook.svg'

// Icons taken from: https://simpleicons.org/

const components = {
  mail: Mail,
  github: Github,
  facebook: Facebook,
}

const SocialIcon = ({ kind, href, size = 25 }) => {
  if (!href || (kind === 'mail' && !/^mailto:\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(href)))
    return null

  const SocialSvg = components[kind]

  return (
    <a
      className='text-sm text-gray-500  hover:text-gray-600'
      target='_blank'
      rel='noopener noreferrer'
      href={href}
    >
      <SocialSvg
        width={size} 
        height={size}
        className={`fill-current text-gray-700 hover:text-blue-500 dark:text-gray-200 dark:hover:text-blue-400`}
      />
    </a>
  )
}

export default SocialIcon
