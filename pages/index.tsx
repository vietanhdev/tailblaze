import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'
import Typed from 'typed.js'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import kebabCase from 'lib/utils/kebabCase'
import ExportedImage from 'next-image-export-optimizer'
import mockCodingStats from '@/data/mockCodingStats'
import { GetStaticProps } from 'next'
import React from 'react'
import { FrontMatter, CodingStats, convertToFrontMatters } from '../types'

const MAX_DISPLAY = 6

interface HomeProps {
  posts: FrontMatter[]
  codingStats: CodingStats
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const mdxPosts = await getAllFilesFrontMatter('blog')

  // Convert MDXFrontMatter to required FrontMatter format
  const posts = convertToFrontMatters(mdxPosts)

  // Use mock data directly
  const codingStats = mockCodingStats

  return { props: { posts, codingStats } }
}

export default function Home({ posts, codingStats }: HomeProps): React.ReactNode {
  const el = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ['John Doe', 'a Developer', 'a Creator', 'a Tech Writer', 'an Innovator'],
      startDelay: 300,
      typeSpeed: 25,
      backSpeed: 10,
      backDelay: 1500,
      loop: true,
    })

    // Destropying
    return () => {
      typed.destroy()
    }
  }, [])

  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div>
        <div className="mb-2 flex flex-col items-center gap-x-12 xl:flex-row">
          <div className="pt-16 md:pt-16 md:pl-8">
            <h2 className="hidden font-semibold tracking-tight text-gray-900 sm:block sm:text-2xl lg:text-3xl">
              Hi! I am <span ref={el} className="text-indigo-600"></span>
            </h2>
            <h2 className="text-md mb-4 hidden text-gray-600 sm:block sm:text-2xl">
              Welcome to My Tech Blog!
            </h2>
            <h2 className="prose pt-5 text-sm text-gray-700 md:text-lg">
              <span className="float-left mr-4">
                <ExportedImage
                  width={128}
                  height={128}
                  className="mt-0 h-20 w-20 rounded-full shadow-lg md:h-36 md:w-36 mr-4"
                  alt="John Doe"
                  src={'https://ui-avatars.com/api/?name=John+Doe&background=random'}
                  blurDataURL="/images/SVG-placeholder.png"
                  placeholder="blur"
                />
              </span>
              This is my personal blog where I share insights about Web Development, Cloud
              Computing, DevOps practices, and Technology trends.
            </h2>
            <div>
              <div className="mt-8 text-slate-600">
                <span className="text-sm">Press</span>{' '}
                <span className="rounded-md bg-gray-300 p-1 text-sm text-gray-900">⌘</span>{' '}
                <span className="text-sm">+ </span>
                <span className="rounded-md bg-gray-300 p-1 text-sm text-gray-900">K</span>{' '}
                <span className="text-sm">to search</span>
              </div>
            </div>
          </div>
          <div className="hidden items-center justify-center xl:flex">
            <div className="grid grid-cols-1 grid-rows-3 gap-8 md:mt-24">
              <div className="my-0 grid min-w-[380px] items-start gap-8">
                <div className="group relative">
                  <div className="animate-tilt absolute -inset-0.5 rounded-xl opacity-50 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200"></div>
                  <Link passHref href="/projects">
                    <span className="relative flex items-center divide-x divide-primary-600 rounded-xl border-2 border-gray-600 bg-white px-7 py-4 leading-none hover:bg-gray-100">
                      <span className="flex items-center space-x-5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 text-blue-500"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3"
                          />
                        </svg>
                        <span className="pr-6 text-gray-500">My Projects</span>
                      </span>
                      <span className="pl-6 text-primary-500 transition duration-200 group-hover:text-gray-800">
                        Explore&nbsp;&rarr;
                      </span>
                    </span>
                  </Link>
                </div>
              </div>
              <div className="my-0 grid min-w-[380px] items-start gap-8">
                <div className="group relative">
                  <div className="animate-tilt absolute -inset-0.5 rounded-xl opacity-50 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200"></div>
                  <Link passHref href="/contact">
                    <span className="relative flex items-center divide-x divide-primary-600 rounded-xl border-2 border-gray-600 bg-white px-7 py-4 leading-none hover:bg-gray-100">
                      <span className="flex items-center space-x-5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 text-green-500"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5"
                          />
                        </svg>
                        <span className="pr-6 text-gray-500">Collaboration</span>
                      </span>
                      <span className="pl-6 text-primary-500 transition duration-200 group-hover:text-gray-800">
                        Contact&nbsp;&rarr;
                      </span>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h2 className="mt-8 flex pb-6 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-5xl">
          Latest
        </h2>
        <hr className="border-gray-200" />
        <ul className="grid grid-cols-1 gap-6 py-6 md:grid-cols-2 xl:grid-cols-3">
          {!posts.length && 'Content is underconstruction.'}
          {posts.slice(0, MAX_DISPLAY).map((frontMatter, index) => {
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
                            <ExportedImage
                              className="h-[256px] w-full rounded-xl border-[1px] border-gray-300 object-cover md:h-48"
                              width={320}
                              height={256}
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
                          <Link
                            passHref
                            href={external ? external : `/blog/${slug}`}
                            target={external ? '_blank' : ''}
                          >
                            {title}{' '}
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
                            {tags.map((tag: string, index: number) => (
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
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end pt-5 text-lg font-normal leading-6">
          <Link
            href="/blog"
            className="special-underline-new text-primary-600 hover:text-gray-100 hover:no-underline p-2 hover:rounded-xl flex"
            aria-label="all posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
    </>
  )
}
