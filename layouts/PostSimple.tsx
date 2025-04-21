import Link from 'next/link'
import React from 'react'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import { BlogSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import formatDate from '@/lib/utils/formatDate'
import Comments from '@/components/comments'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import { HiOutlinePencil, HiOutlineClock } from 'react-icons/hi'
import { BsCalendarDate } from 'react-icons/bs'

interface ReadingTime {
  text: string
  minutes: number
  time: number
  words: number
}

interface FrontMatter {
  date: string
  title: string
  slug: string
  readingTime: ReadingTime
  [key: string]: any
}

interface PostSimpleProps {
  frontMatter: FrontMatter
  next?: { slug: string; title: string; [key: string]: any }
  prev?: { slug: string; title: string; [key: string]: any }
  children: React.ReactNode
}

export default function PostSimple({ frontMatter, next, prev, children }: PostSimpleProps) {
  const { date, title, readingTime } = frontMatter

  return (
    <SectionContainer>
      <BlogSEO
        url={`${siteMetadata.siteUrl}/notes/${frontMatter.slug}`}
        summary={frontMatter.summary || `${title} - ${siteMetadata.title}`}
        {...frontMatter}
      />
      <ScrollTopAndComment />
      <article>
        <div className="mx-auto max-w-3xl">
          <header>
            <div className="space-y-1 border-b border-gray-200 pb-10 text-center">
              <div>
                <dt className="sr-only">Published on</dt>
                <dd className="text-base font-medium leading-6 text-gray-500">
                  <time dateTime={date}>
                    <BsCalendarDate className="-mt-1 mr-1 inline h-4 w-4" /> {formatDate(date)}
                  </time>
                </dd>
              </div>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
              <div className="flex justify-center gap-5 py-4">
                <span className="flex items-center gap-1.5">
                  <HiOutlinePencil className="h-5 w-5" />
                  {readingTime.words} words
                </span>
                <span className="flex items-center gap-1.5">
                  <HiOutlineClock className="h-5 w-5" />
                  {readingTime.text}
                </span>
              </div>
            </div>
          </header>
          <div
            className="divide-y divide-gray-200 pb-8 xl:divide-y-0"
            style={{ gridTemplateRows: 'auto 1fr' }}
          >
            <div className="divide-y divide-gray-200 xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose max-w-none pb-8 pt-10">{children}</div>
            </div>
            <div className="mt-12">
              <Comments frontMatter={frontMatter} />
            </div>
            <footer>
              <div className="flex flex-col text-sm font-medium sm:flex-row sm:justify-between sm:text-base">
                {prev && (
                  <div className="pt-4 xl:pt-8">
                    <Link
                      href={`/notes/${prev.slug}`}
                      className="text-primary-600 hover:text-primary-600"
                    >
                      &larr; {prev.title}
                    </Link>
                  </div>
                )}
                {next && (
                  <div className="pt-4 xl:pt-8">
                    <Link
                      href={`/notes/${next.slug}`}
                      className="text-primary-600 hover:text-primary-600"
                    >
                      {next.title} &rarr;
                    </Link>
                  </div>
                )}
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
