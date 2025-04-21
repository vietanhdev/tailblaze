import PageTitle from '@/components/PageTitle'
import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { formatSlug, getAllFilesFrontMatter, getFileBySlug, getFiles } from '@/lib/mdx'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import React from 'react'
import { Post, Author, convertToPosts } from '@/types'

const DEFAULT_LAYOUT = 'PostLayout'

interface SlugParams extends ParsedUrlQuery {
  slug: string[]
}

interface NoteProps {
  post: {
    mdxSource: any
    toc: any
    frontMatter: {
      title: string
      date: string
      tags: string[]
      slug: string
      layout?: string
      draft?: boolean
      [key: string]: any
    }
  }
  authorDetails: Author[]
  prev: Post | null
  next: Post | null
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getFiles('notes')
  return {
    paths: posts.map((p) => ({
      params: {
        slug: formatSlug(p).split('/'),
      },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<NoteProps, SlugParams> = async ({ params }) => {
  const { slug } = params as SlugParams
  const allPosts = await getAllFilesFrontMatter('notes')
  const postIndex = allPosts.findIndex((post) => formatSlug(post.slug || '') === slug.join('/'))

  // Convert posts to properly typed Post objects
  const processedPosts = convertToPosts(allPosts)
  const prev = processedPosts[postIndex + 1] || null
  const next = processedPosts[postIndex - 1] || null

  const post = await getFileBySlug('notes', slug.join('/'))
  // Ensure frontMatter has required fields with proper types
  if (post.frontMatter.slug === null) post.frontMatter.slug = ''
  if (post.frontMatter.date === null) post.frontMatter.date = ''
  post.frontMatter.tags = post.frontMatter.tags || []

  const authorList = post.frontMatter.authors || ['default']
  const authorPromise = authorList.map(async (author) => {
    const authorResults = await getFileBySlug('authors', author)
    return authorResults.frontMatter
  })
  const authorDetails = await Promise.all(authorPromise)

  // Type assertion to satisfy TypeScript
  const result: NoteProps = {
    post: {
      mdxSource: post.mdxSource,
      toc: post.toc,
      frontMatter: {
        ...post.frontMatter,
        title: post.frontMatter.title,
        date: post.frontMatter.date || '',
        tags: post.frontMatter.tags || [],
        slug: post.frontMatter.slug || '',
      },
    },
    authorDetails,
    prev,
    next,
  }

  return { props: result }
}

export default function Blog({ post, authorDetails, prev, next }: NoteProps): React.ReactNode {
  const { mdxSource, toc, frontMatter } = post

  return (
    <>
      {frontMatter.draft !== true ? (
        <MDXLayoutRenderer
          layout={frontMatter.layout || DEFAULT_LAYOUT}
          toc={toc}
          mdxSource={mdxSource}
          frontMatter={frontMatter}
          authorDetails={authorDetails}
          prev={prev}
          next={next}
        />
      ) : (
        <div className="mt-24 text-center">
          <PageTitle>
            Under Construction{' '}
            <span role="img" aria-label="roadwork sign">
              🚧
            </span>
          </PageTitle>
        </div>
      )}
    </>
  )
}
