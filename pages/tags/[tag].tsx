import { TagSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import generateRss from '@/lib/generate-rss'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import { getAllTags } from '@/lib/tags'
import kebabCase from '@/lib/utils/kebabCase'
import fs from 'fs'
import path from 'path'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import React from 'react'
import { Post, convertToPosts } from '@/types'

const root = process.cwd()

interface TagProps {
  posts: Post[]
  tag: string
}

interface TagParams extends ParsedUrlQuery {
  tag: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  const tags = await getAllTags('blog')

  return {
    paths: Object.keys(tags).map((tag) => ({
      params: {
        tag: kebabCase(tag),
      },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<TagProps, TagParams> = async ({ params }) => {
  const { tag } = params as TagParams
  const allPosts = await getAllFilesFrontMatter('blog')
  const processedPosts = convertToPosts(allPosts)

  const filteredPosts = processedPosts.filter(
    (post) => post.draft !== true && post.tags?.map((t) => kebabCase(t)).includes(tag)
  )

  // rss
  if (filteredPosts.length > 0) {
    const rss = generateRss(filteredPosts, `tags/${tag}/feed.xml`)
    const rssPath = path.join(root, 'public', 'tags', tag)
    fs.mkdirSync(rssPath, { recursive: true })
    fs.writeFileSync(path.join(rssPath, 'feed.xml'), rss)
  }

  return { props: { posts: filteredPosts, tag } }
}

export default function Tag({ posts, tag }: TagProps): React.ReactNode {
  // Capitalize first letter and convert space to dash
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)
  return (
    <>
      <TagSEO
        title={`${tag} - ${siteMetadata.author}`}
        description={`${tag} tags - ${siteMetadata.author}`}
      />
      <ListLayout posts={posts} title={title} />
    </>
  )
}
