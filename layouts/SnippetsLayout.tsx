import { useState, useEffect } from 'react'
import Pagination from '@/components/Pagination'
import SnippetCard from '@/components/SnippetCard'
import EmptyState from '@/components/EmptyState'
import { Post, Pagination as PaginationType } from '@/types'

interface SnippetsLayoutProps {
  title: string
  initialDisplayPosts: Post[]
  pagination?: PaginationType
}

export default function SnippetsLayout({
  title,
  initialDisplayPosts = [],
  pagination,
}: SnippetsLayoutProps) {
  const [searchValue, setSearchValue] = useState('')
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(initialDisplayPosts)

  useEffect(() => {
    const filtered = initialDisplayPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        post.tags?.some((tag) => tag.toLowerCase().includes(searchValue.toLowerCase())) ||
        post.summary?.toLowerCase().includes(searchValue.toLowerCase())
    )
    setFilteredPosts(filtered)
  }, [searchValue, initialDisplayPosts])

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 md:pb-8 pt-8 md:space-y-6">
          <h1 className="text-4xl font-bold leading-tight tracking-tighter text-gray-900 sm:text-5xl md:text-6xl font-title">
            {title}
          </h1>
        </div>

        {!filteredPosts.length && searchValue ? (
          <EmptyState
            title="No snippets found"
            description="Try searching for something else or check back later for more content."
            icon="search"
          />
        ) : null}

        {!initialDisplayPosts.length && !searchValue ? (
          <EmptyState
            title="Coming soon!"
            description="Content is under construction. Check back later for exciting snippets and resources."
            icon="content"
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 md:gap-6 py-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <SnippetCard
                key={post.slug}
                slug={post.slug}
                title={post.title}
                tags={post.tags}
                summary={post.summary}
                date={post.date}
                author={post.author}
              />
            ))}
          </div>
        )}
      </div>
      {pagination && pagination.totalPages > 1 && (
        <div className="mt-4 md:mt-8">
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            sectionName="notes"
          />
        </div>
      )}
    </>
  )
}
