import Link from 'next/link'

interface Props {
  text: string
}

const Category = ({ text }: Props) => {
  return (
    <Link
      href={`/categories/${text}`} 
      className="text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
    >
      {text?.toUpperCase()}
    </Link>
  )
}

export default Category
