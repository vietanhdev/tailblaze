import { Post } from './post'
import { Pagination } from './pagination'
import { Author } from './author'
import { Term } from './glossary'

// Props for ListLayout
export interface ListLayoutProps {
  posts: Post[]
  initialDisplayPosts?: Post[]
  pagination: Pagination
  title: string
}

// Props for LessonsLayout
export interface LessonsLayoutProps {
  posts: Post[]
  initialDisplayPosts?: Post[]
  pagination?: Pagination
  title: string
}

// Props for PostLayout
export interface PostLayoutProps {
  frontMatter: Post
  authorDetails: Author[]
  next?: Post | null
  prev?: Post | null
  toc?: any
  children: React.ReactNode
}

// Props for GlossaryLayout
export interface GlossaryLayoutProps {
  term: Term
  next?: Term
  prev?: Term
  children: React.ReactNode
}
