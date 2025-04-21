import { Post } from './post'
import { Pagination } from './pagination'
import { Author } from './author'
import { Term } from './glossary'

// Props for blog post pages
export interface BlogPostProps {
  post: {
    mdxSource: any
    toc: any
    frontMatter: {
      layout?: string
      draft?: boolean
      [key: string]: any
    }
  }
  authorDetails: Author[]
  prev: Post | null
  next: Post | null
}

// Props for blog listing pages
export interface BlogPageProps {
  posts: Post[]
  initialDisplayPosts: Post[]
  pagination: Pagination
}

// Props for courses pages
export interface CourseProps {
  post: {
    mdxSource: any
    toc: any
    frontMatter: {
      layout?: string
      draft?: boolean
      slug: string
      date: string
      tags: string[]
      [key: string]: any
    }
  }
  authorDetails: Author[]
  prev: Post | null
  next: Post | null
}

// Props for glossary term page
export interface GlossaryTermProps {
  post: Term
  content: string
  next: Term | null
  prev: Term | null
}

// Props for glossary listing page
export interface GlossaryPageProps {
  posts: Term[]
  pagination: Pagination
}
