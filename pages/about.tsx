import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { getFileBySlug } from '@/lib/mdx'
import { GetStaticProps } from 'next'
import React from 'react'

const DEFAULT_LAYOUT = 'AuthorLayout'

interface AuthorDetails {
  mdxSource: any
  frontMatter: {
    layout?: string
    [key: string]: any
  }
}

interface AboutProps {
  authorDetails: AuthorDetails
}

export const getStaticProps: GetStaticProps<AboutProps> = async () => {
  const authorDetails = await getFileBySlug('authors', 'default')
  return { props: { authorDetails } }
}

export default function About({ authorDetails }: AboutProps): React.ReactNode {
  const { mdxSource, frontMatter } = authorDetails

  return (
    <MDXLayoutRenderer
      layout={frontMatter.layout || DEFAULT_LAYOUT}
      mdxSource={mdxSource}
      frontMatter={frontMatter}
    />
  )
}
