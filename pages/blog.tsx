import { getAllFilesFrontMatter } from '@/lib/mdx'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { PageSEO } from '@/components/SEO'
import { GetStaticProps } from 'next'
import React from 'react'
import { BlogPageProps, convertToPosts, calculatePagination, Post } from '@/types'

export const POSTS_PER_PAGE = 12

export const getStaticProps: GetStaticProps<BlogPageProps> = async () => {
  const allPosts = await getAllFilesFrontMatter('blog')

  // Convert FrontMatter to Post type
  const posts = convertToPosts(allPosts)

  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)
  const pagination = calculatePagination(posts.length, POSTS_PER_PAGE)

  return { props: { initialDisplayPosts, posts, pagination } }
}

export default function Blog({
  posts,
  initialDisplayPosts,
  pagination,
}: BlogPageProps): React.ReactNode {
  return (
    <>
      <PageSEO title={`Blog - ${siteMetadata.author}`} description={siteMetadata.description} />
      <ListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="Blog"
      />
    </>
  )
}
