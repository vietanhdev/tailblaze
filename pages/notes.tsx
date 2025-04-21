import { getAllFilesFrontMatter } from '@/lib/mdx'
import siteMetadata from '@/data/siteMetadata'
import SnippetsLayout from '@/layouts/SnippetsLayout'
import { PageSEO } from '@/components/SEO'
import { GetStaticProps } from 'next'
import React from 'react'
import { Post, Pagination, convertToPosts, calculatePagination } from '@/types'

export const POSTS_PER_PAGE = 18

interface NotesProps {
  initialDisplayPosts: Post[]
  pagination: Pagination
}

export const getStaticProps: GetStaticProps<NotesProps> = async () => {
  const allPosts = await getAllFilesFrontMatter('notes')
  const posts = convertToPosts(allPosts)
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)
  const pagination = calculatePagination(posts.length, POSTS_PER_PAGE)

  return { props: { initialDisplayPosts, pagination } }
}

export default function Snippets({ initialDisplayPosts, pagination }: NotesProps): React.ReactNode {
  return (
    <>
      <PageSEO title={`Notes - ${siteMetadata.author}`} description="Random notes" />
      <SnippetsLayout
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="Notes"
      />
    </>
  )
}
