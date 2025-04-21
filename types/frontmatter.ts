// Raw data from mdx.ts
export interface MDXFrontMatter {
  slug: string | null
  date: string | null
  title: string
  summary?: string
  tags?: string[]
  external?: string | null
  image?: string
  fileName: string
  readingTime?: { text: string; minutes: number; time: number; words: number }
  [key: string]: any
}

// Processed frontmatter for UI components
export interface FrontMatter {
  slug: string
  date: string
  title: string
  summary?: string
  tags: string[]
  external?: string | null
  image?: string
  [key: string]: any
}

// Convert MDXFrontMatter to FrontMatter
export function convertToFrontMatter(post: MDXFrontMatter): FrontMatter | null {
  if (post.slug === null || post.date === null) return null

  return {
    ...post,
    slug: post.slug,
    date: post.date,
    tags: post.tags || [],
    external: post.external || null,
  }
}

// Convert array of MDXFrontMatter to array of FrontMatter
export function convertToFrontMatters(posts: MDXFrontMatter[]): FrontMatter[] {
  return posts
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
