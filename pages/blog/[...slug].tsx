import fs from 'fs'
import PageTitle from '@/components/PageTitle'
import generateRss from '@/lib/generate-rss'
import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { formatSlug, getAllFilesFrontMatter, getFileBySlug, getFiles } from '@/lib/mdx'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import 'katex/dist/katex.min.css'
import React from 'react'
import { Post, BlogPostProps, convertToPosts } from '@/types'

const DEFAULT_LAYOUT = 'PostLayout'

interface SlugParams extends ParsedUrlQuery {
  slug: string[]
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getFiles('blog')
  return {
    paths: posts.map((p) => ({
      params: {
        slug: formatSlug(p).split('/'),
      },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<BlogPostProps, SlugParams> = async ({ params }) => {
  const { slug } = params as SlugParams
  const allPosts = await getAllFilesFrontMatter('blog')
  const postIndex = allPosts.findIndex((post) => formatSlug(post.slug || '') === slug.join('/'))

  // Convert to Post type first
  const processedPosts = convertToPosts(allPosts)

  // Ensure prev and next are properly serializable
  let prev = processedPosts[postIndex + 1] || null
  let next = processedPosts[postIndex - 1] || null

  // Make sure external property is a string or null/undefined for serialization
  if (prev) {
    prev = {
      ...prev,
      external: prev.external || null,
    }
  }

  if (next) {
    next = {
      ...next,
      external: next.external || null,
    }
  }

  const post = await getFileBySlug('blog', slug.join('/'))
  const authorList = post.frontMatter.authors || ['default']
  const authorPromise = authorList.map(async (author) => {
    const authorResults = await getFileBySlug('authors', author)
    return authorResults.frontMatter
  })
  const authorDetails = await Promise.all(authorPromise)

  // rss
  if (allPosts.length > 0) {
    const rss = generateRss(processedPosts)
    fs.writeFileSync('./public/feed.xml', rss)
  }

  return { props: { post, authorDetails, prev, next } }
}

export default function Blog({ post, authorDetails, prev, next }: BlogPostProps): React.ReactNode {
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
