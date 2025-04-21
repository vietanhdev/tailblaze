import Link from 'next/link'
import Tag from '@/components/Tag'
import Pagination from '@/components/Pagination'
import { Term, Collection, Pagination as PaginationType } from '@/types'

interface GlossaryListLayoutProps {
  posts: Term[]
  title: string
  pagination?: PaginationType
}

export default function GlossaryListLayout({ posts, title, pagination }: GlossaryListLayoutProps) {
  const displayPosts = posts

  return (
    <>
      <div className="mx-auto max-w-6xl divide-y divide-gray-400">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="md:leading-14 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl mt-4 sm:leading-10 md:text-5xl font-title">
            {title}
          </h1>
          <div className="text-gray-800">
            Terms and concepts in the field of AI and Machine Learning.
            <br />
            Powered by{' '}
            <b>
              <a href="https://paperswithcode.com/">Papers with Code</a>
            </b>
            .
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
          {!displayPosts.length && 'Content is underconstruction.'}
          {displayPosts.map((frontMatter) => {
            const { name, full_name, collections } = frontMatter
            return (
              <div
                key={name}
                className="bg-day·group group relative flex transform cursor-pointer flex-wrap overflow-hidden rounded-md border border-gray-400 bg-opacity-50 p-px py-px transition duration-200 hover:scale-105 hover:border-2 hover:border-gray-800 hover:bg-gray-50"
              >
                <div className="bg-day relative space-y-2 p-4">
                  <article>
                    <div>
                      <h2 className="text-2xl font-bold leading-8 tracking-tight ">
                        <Link
                          href={`/glossary/${name?.toLowerCase()}`}
                          className="text-gray-900 transition  duration-500 ease-in-out hover:text-primary-600"
                        >
                          {full_name}
                        </Link>
                      </h2>
                      <div className="flex flex-wrap pt-2">
                        {collections?.map((collection, index) => (
                          <Tag key={index} text={collection.collection} />
                        ))}
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      {pagination && pagination.totalPages > 1 && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          sectionName="glossary"
        />
      )}
    </>
  )
}
