import Link from 'next/link'
import Tag from '@/components/Tag'
import Pagination from '@/components/Pagination'
import formatDate from '@/lib/utils/formatDate'
import Image from 'next-image-export-optimizer'
import kebabCase from 'lib/utils/kebabCase'
import { Post, Pagination as PaginationType, LessonsLayoutProps } from '@/types'

export default function LessonsLayout({ posts, title, pagination }: LessonsLayoutProps) {
  const displayPosts = posts

  return (
    <>
      <div className="mx-auto max-w-6xl divide-y divide-gray-400">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="md:leading-14 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl mt-4 sm:leading-10 md:text-5xl font-title">
            {title}
          </h1>
        </div>
        <ul className="grid grid-cols-1 gap-6 py-12 md:grid-cols-2 xl:grid-cols-3">
          {!displayPosts.length && 'Content is underconstruction.'}
          {displayPosts.map((frontMatter, index) => {
            const { slug, date, title, summary, tags } = frontMatter
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
                            href={`/courses/${slug}`}
                            aria-label={`${title} thumbnail`}
                          >
                            <Image
                              className="h-[200px] w-full rounded-lg border-[1px] border-gray-300 object-cover md:h-48"
                              width={640}
                              height={360}
                              src={thumbnail}
                              alt={title}
                              blurDataURL="/images/SVG-placeholder.png"
                              priority={index < 2}
                            />
                          </Link>
                        )}
                      </div>
                      <div className="p-1">
                        <h2 className="mt-1 block text-lg font-medium leading-tight text-gray-900 transition duration-500 ease-in-out hover:text-primary-600">
                          <Link passHref href={`/courses/${slug}`} aria-label={title}>
                            {title}
                          </Link>
                        </h2>
                        <div className="text-xs font-normal leading-6 text-gray-500">
                          <time dateTime={date}>{formatDate(date)}</time>
                        </div>
                        <div className="text-xs font-semibold uppercase tracking-wide text-indigo-500">
                          <div className="flex flex-wrap">
                            {tags.map((tag, index) => (
                              <Link key={index} passHref href={`/tags/${kebabCase(tag)}`}>
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
