import Link from 'next/link'
import Tag from '@/components/Tag'
import Pagination from '@/components/Pagination'
import formatDate from '@/lib/utils/formatDate'
import Image from 'next-image-export-optimizer'
import kebabCase from 'lib/utils/kebabCase'
import { Post } from '@/types'

interface PaginationProps {
  currentPage: number
  totalPages: number
}

interface ListLayoutProps {
  posts: Post[]
  initialDisplayPosts?: Post[]
  title: string
  pagination?: PaginationProps
}

export default function ListLayout({
  posts,
  initialDisplayPosts,
  title,
  pagination,
}: ListLayoutProps) {
  const displayPosts = initialDisplayPosts || posts

  return (
    <>
      <div className="mx-auto max-w-6xl">
        <div className="space-y-4 md:pb-12 pt-8 md:space-y-6">
          <h1 className="text-4xl font-bold leading-tight tracking-tighter text-gray-900 sm:text-5xl md:text-6xl font-title">
            {title}
          </h1>
        </div>
        <ul className="grid grid-cols-1 gap-6 py-12 md:grid-cols-2 xl:grid-cols-3">
          {!displayPosts.length && 'Content is underconstruction.'}
          {displayPosts.map((frontMatter, index) => {
            const { slug, date, title, summary, tags, external } = frontMatter
            let thumbnail = null
            if (frontMatter.image) {
              thumbnail = frontMatter.image
            }
            return (
              <li key={slug} className="py-2">
                <div
                  key={slug}
                  className="h-full bg-opacity-20 px-2 transition duration-100 hover:scale-105 hover:rounded-xl"
                >
                  <div className="h-full w-full overflow-hidden">
                    <div className="md:flex md:flex-col">
                      <div className="md:shrink-0">
                        {thumbnail && (
                          <Link
                            passHref
                            href={external ? external : `/blog/${slug}`}
                            target={external ? '_blank' : ''}
                          >
                            <Image
                              className="h-[256px] w-full rounded-lg border-[1px] border-gray-300 object-cover md:h-48"
                              width={320}
                              height={256}
                              src={thumbnail}
                              alt={title}
                              priority={index < 2}
                              blurDataURL="/images/SVG-placeholder.png"
                            />
                          </Link>
                        )}
                      </div>
                      <div className="p-1">
                        <h2 className="mt-1 block text-lg font-medium leading-tight text-gray-900 transition duration-500 ease-in-out hover:text-primary-600">
                          <Link
                            passHref
                            href={external ? external : `/blog/${slug}`}
                            target={external ? '_blank' : ''}
                          >
                            {title}
                            {external && (
                              <span className="ml-2 rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                                External
                              </span>
                            )}
                          </Link>
                        </h2>
                        <div className="text-xs font-normal leading-6 text-gray-500">
                          <time dateTime={date}>{formatDate(date)}</time>
                        </div>
                        <div className="text-xs font-semibold uppercase tracking-wide text-indigo-500">
                          <div className="flex flex-wrap">
                            {tags.map((tag, index) => (
                              <Link
                                key={index}
                                passHref
                                href={`/tags/${kebabCase(tag)}`}
                                aria-label={tag}
                              >
                                <Tag text={tag} />
                              </Link>
                            ))}
                          </div>
                        </div>
                        <p className="mt-2 text-slate-800">{summary?.slice(0, 200)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
      {pagination && pagination.totalPages > 1 && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </>
  )
}
