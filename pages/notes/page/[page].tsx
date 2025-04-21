import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import SnippetsLayout from '@/layouts/SnippetsLayout'
import { POSTS_PER_PAGE } from '../../notes'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import React from 'react'
import { Post, Pagination, convertToPosts, calculatePagination } from '@/types'

interface NotesPageProps {
  initialDisplayPosts: Post[]
  pagination: Pagination
}

interface PageParams extends ParsedUrlQuery {
  page: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  const totalPosts = await getAllFilesFrontMatter('notes')
  const totalPages = Math.ceil(totalPosts.length / POSTS_PER_PAGE)
  const paths = Array.from({ length: totalPages }, (_, i) => ({
    params: { page: (i + 1).toString() },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<NotesPageProps, PageParams> = async (context) => {
  const { page } = context.params as PageParams
  const allPosts = await getAllFilesFrontMatter('notes')
  // Convert to properly typed Post objects
  const posts = convertToPosts(allPosts)

  const pageNumber = parseInt(page)
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = calculatePagination(posts.length, POSTS_PER_PAGE, pageNumber)

  return {
    props: {
      initialDisplayPosts,
      pagination,
    },
  }
}

export default function PostPage({
  initialDisplayPosts,
  pagination,
}: NotesPageProps): React.ReactNode {
  return (
    <>
      <PageSEO title={`Notes - ${siteMetadata.author}`} description={siteMetadata.notes} />
      <SnippetsLayout
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="Notes"
      />
    </>
  )
}
