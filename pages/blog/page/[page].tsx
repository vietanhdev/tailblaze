import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import ListLayout from '@/layouts/ListLayout'
import { POSTS_PER_PAGE } from '../../blog'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import React from 'react'
import { BlogPageProps, convertToPosts, calculatePagination } from '@/types'

interface PageParams extends ParsedUrlQuery {
  page: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  const totalPosts = await getAllFilesFrontMatter('blog')
  const totalPages = Math.ceil(totalPosts.length / POSTS_PER_PAGE)
  const paths = Array.from({ length: totalPages }, (_, i) => ({
    params: { page: (i + 1).toString() },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<BlogPageProps, PageParams> = async (context) => {
  const { page } = context.params as PageParams
  const mdxPosts = await getAllFilesFrontMatter('blog')
  const pageNumber = parseInt(page)

  // Convert MDXFrontMatter to Post with proper handling of nullable fields
  const posts = convertToPosts(mdxPosts)

  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = calculatePagination(posts.length, POSTS_PER_PAGE, pageNumber)

  return {
    props: {
      posts,
      initialDisplayPosts,
      pagination,
    },
  }
}

export default function PostPage({
  posts,
  initialDisplayPosts,
  pagination,
}: BlogPageProps): React.ReactNode {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={'Blog - ' + siteMetadata.description} />
      <ListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="Blog"
      />
    </>
  )
}
