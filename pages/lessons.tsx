import { getAllFilesFrontMatter } from '@/lib/mdx'
import siteMetadata from '@/data/siteMetadata'
import Layout from '@/layouts/LessonsLayout'
import { PageSEO } from '@/components/SEO'
import { GetStaticProps } from 'next'
import React from 'react'
import { LessonsLayoutProps, calculatePagination, convertToPosts } from '@/types'

export const POSTS_PER_PAGE = 18

export const getStaticProps: GetStaticProps<LessonsLayoutProps> = async () => {
  const posts = await getAllFilesFrontMatter('courses')
  const processedPosts = convertToPosts(posts)
  const initialDisplayPosts = processedPosts.slice(0, POSTS_PER_PAGE)
  const pagination = calculatePagination(processedPosts.length, POSTS_PER_PAGE)

  return { props: { posts: processedPosts, pagination, title: 'Lessons' } }
}

export default function Lessons({ posts, pagination, title }: LessonsLayoutProps): React.ReactNode {
  return (
    <>
      <PageSEO title={`Lessons - ${siteMetadata.author}`} description={siteMetadata.description} />
      <Layout posts={posts} pagination={pagination} title={title} />
    </>
  )
}
