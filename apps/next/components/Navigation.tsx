import Link from 'next/link'
import { useRouter } from 'next/router'

const pages = [
  {
    slug: '/',
    title: 'Owned Nfts',
  },
  {
    slug: '/contract-array',
    title: 'Contract Array',
  },
  {
    slug: '/markdown-token',
    title: 'Markdown Token',
  },
]

export function Navigation() {
  const router = useRouter()

  return (
    <div className="flex flex-row gap-4">
      {pages.map((page) => (
        <Link passHref href={page.slug} key={page.slug}>
          <a
            style={{
              color: router.asPath === page.slug ? 'red' : 'black',
            }}>
            {page.title}
          </a>
        </Link>
      ))}
    </div>
  )
}
