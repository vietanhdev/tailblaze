import Link from 'next/link'
import React from 'react'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import { BlogSEO } from '@/components/SEO'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import Comments from '@/components/comments'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
  TwitterIcon,
  FacebookIcon,
  EmailIcon,
} from 'react-share'
import { HiOutlinePencil, HiOutlineClock } from 'react-icons/hi'
import { BsCalendarDate } from 'react-icons/bs'
import { parseDateWithDefaultTimezone } from '@/lib/datetime'

const postDateTemplate = {
  weekday: 'long' as const,
  year: 'numeric' as const,
  month: 'long' as const,
  day: 'numeric' as const,
}

interface ReadingTime {
  text: string
  minutes: number
  time: number
  words: number
}

interface FrontMatter {
  slug: string
  date: string
  title: string
  tags: string[]
  readingTime: ReadingTime
  [key: string]: any
}

interface Author {
  name: string
  avatar?: string
  twitter?: string
  [key: string]: any
}

interface PostLayoutProps {
  frontMatter: FrontMatter
  authorDetails: Author[]
  next?: { slug: string; title: string; [key: string]: any }
  prev?: { slug: string; title: string; [key: string]: any }
  children: React.ReactNode
}

export default function PostLayout({
  frontMatter,
  authorDetails,
  next,
  prev,
  children,
}: PostLayoutProps) {
  const { slug, date, title, tags, readingTime } = frontMatter
  const postUrl = `${siteMetadata.siteUrl}/blog/${slug}`
  return (
    <SectionContainer>
      <BlogSEO
        url={`${siteMetadata.siteUrl}/blog/${slug}`}
        authorDetails={authorDetails}
        summary={frontMatter.summary || `${title} - ${siteMetadata.title}`}
        {...frontMatter}
      />
      <ScrollTopAndComment />
      <article>
        <div className="xl:divide-y xl:divide-gray-200">
          <header className="pt-6 xl:pb-5">
            <div className="space-y-1 text-center">
              <div className="space-y-10">
                <div>
                  <div className="sr-only">Published on</div>
                  <div className="text-base font-medium leading-6 text-gray-500">
                    <time dateTime={date}>
                      <BsCalendarDate className="-mt-1.5 mr-1.5 inline h-4 w-4" />
                      {parseDateWithDefaultTimezone(date).toLocaleDateString(
                        siteMetadata.locale,
                        postDateTemplate
                      )}
                    </time>
                  </div>
                </div>
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
            className="divide-y divide-gray-200 pb-8 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0"
            style={{ gridTemplateRows: 'auto 1fr' }}
          >
            <div className="pb-10 pt-6 xl:border-b xl:border-gray-200 xl:pt-11">
              <div className="sr-only">Authors</div>
              <div>
                <ul className="flex justify-center space-x-8 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-8">
                  {authorDetails.map((author) => (
                    <li className="flex items-center space-x-2" key={author.name}>
                      {author.avatar && (
                        <Image
                          src={author.avatar}
                          width={256}
                          height={256}
                          alt="avatar"
                          className="h-10 w-10 rounded-full"
                          priority
                        />
                      )}
                      <div className="whitespace-nowrap text-sm font-medium leading-5">
                        <div className="sr-only">Name</div>
                        <div className="text-gray-900">{author.name}</div>
                        <div className="sr-only">Twitter</div>
                        <div>
                          {author.twitter && (
                            <Link
                              passHref
                              href={author.twitter}
                              className="text-primary-600 hover:text-primary-600"
                            >
                              {author.twitter.replace('https://twitter.com/', '@')}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className="ml-0.5 inline-block h-4 w-4 fill-current"
                              >
                                <g data-name="Layer 2">
                                  <g data-name="external-link">
                                    <rect width="24" height="24" opacity="0" />
                                    <path d="M20 11a1 1 0 0 0-1 1v6a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h6a1 1 0 0 0 0-2H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-6a1 1 0 0 0-1-1z" />
                                    <path d="M16 5h1.58l-6.29 6.28a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0L19 6.42V8a1 1 0 0 0 1 1 1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-4a1 1 0 0 0 0 2z" />
                                  </g>
                                </g>
                              </svg>
                            </Link>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="divide-y divide-gray-200 xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose max-w-nonepb-8 pt-10 mx-auto px-0 prose-img:rounded-lg">
                {children}
              </div>
              <div className="grid place-items-center pb-6 pt-6 text-sm text-gray-700 mt-12">
                <div className="flex items-center space-x-4">
                  <TwitterShareButton
                    url={postUrl}
                    title={title}
                    via={siteMetadata.socialAccount.twitter}
                    className="flex items-center overflow-hidden rounded-full hover:scale-110"
                  >
                    <TwitterIcon size={35} round={true} />
                  </TwitterShareButton>
                  <FacebookShareButton
                    url={postUrl}
                    quote={title}
                    className="flex items-center overflow-hidden rounded-full hover:scale-110"
                  >
                    <FacebookIcon size={35} round={true} />
                  </FacebookShareButton>
                  <EmailShareButton
                    body={'Check out this blog'}
                    subject={title}
                    separator=" : "
                    url={postUrl}
                    className="flex items-center overflow-hidden rounded-full hover:scale-110"
                  >
                    <EmailIcon size={35} round={true} />
                  </EmailShareButton>
                </div>
              </div>
              <Comments frontMatter={frontMatter} />
            </div>
            <footer>
              <div className="divide-gray-200 text-sm font-medium leading-5 xl:col-start-1 xl:row-start-2 xl:divide-y">
                {tags && (
                  <div className="py-4 xl:py-8">
                    <h2 className="pb-1 text-xs uppercase tracking-wide text-gray-500">Tags</h2>
                    <div className="flex flex-wrap">
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  </div>
                )}
                {(next || prev) && (
                  <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                    {prev && (
                      <div>
                        <h2 className="text-xs uppercase tracking-wide text-gray-500">
                          Previous Article
                        </h2>
                        <div className="text-primary-600 hover:text-primary-600">
                          <Link passHref href={`/blog/${prev.slug}`} aria-label={prev.title}>
                            {prev.title}
                          </Link>
                        </div>
                      </div>
                    )}
                    {next && (
                      <div>
                        <h2 className="text-xs uppercase tracking-wide text-gray-500">
                          Next Article
                        </h2>
                        <div className="text-primary-600 hover:text-primary-600">
                          <Link passHref href={`/blog/${next.slug}`} aria-label={next.title}>
                            {next.title}
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="pt-4 xl:pt-8">
                <Link
                  passHref
                  href="/blog"
                  className="text-primary-600 hover:text-primary-600"
                  aria-label="Back to the blog"
                >
                  &larr; Back to the blog
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
