// Common post interfaces used across the application

// Raw data from MDX files
export interface MDXFrontMatter {
  slug: string | null
  date: string | null
  title: string
  summary?: string
  tags?: string[]
  lastmod?: string
  draft?: boolean
  images?: string[]
  authors?: string[]
  layout?: string
  fileName: string
  image?: string
  external?: string | null
  readingTime?: { text: string; minutes: number; time: number; words: number }
  [key: string]: any
}

// Processed frontmatter for UI components
export interface Post {
  slug: string
  date: string
  title: string
  summary?: string
  tags: string[]
  image?: string
  external?: string | null
  readingTime?: { text: string; minutes: number; time: number; words: number }
  [key: string]: any
}

// Convert MDXFrontMatter to Post
export function convertToPost(frontMatter: MDXFrontMatter): Post | null {
  if (frontMatter.slug === null || frontMatter.date === null) return null

  return {
    ...frontMatter,
    slug: frontMatter.slug,
    date: frontMatter.date,
    tags: frontMatter.tags || [],
    external: frontMatter.external || null,
  }
}

// Convert array of MDXFrontMatter to array of Post
export function convertToPosts(frontMatters: MDXFrontMatter[]): Post[] {
  return frontMatters
    .filter(
      (post): post is MDXFrontMatter & { slug: string; date: string } =>
        post.slug !== null && post.date !== null
    )
    .map((post) => ({
      ...post,
      tags: post.tags || [],
      external: post.external || null,
    }))
}
