import Link from 'next/link'

interface PaginationProps {
  totalPages: number | string
  currentPage: number | string
  sectionName?: string
}

export default function Pagination({
  totalPages,
  currentPage,
  sectionName = 'blog',
}: PaginationProps) {
  const prevPage = parseInt(currentPage.toString()) - 1 > 0
  const nextPage = parseInt(currentPage.toString()) + 1 <= parseInt(totalPages.toString())

  return (
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button
            aria-label="Previous page"
            className="px-4 py-1 hover:rounded-md cursor-auto disabled:opacity-50"
            disabled={!prevPage}
          >
            Previous
          </button>
        )}
        {prevPage && (
          <Link
            href={
              parseInt(currentPage.toString()) - 1 === 1
                ? `/${sectionName}/`
                : `/${sectionName}/page/${parseInt(currentPage.toString()) - 1}`
            }
            passHref
          >
            <button
              className="px-4 py-1 hover:rounded-md special-underline-new"
              aria-label="Previous page"
            >
              Previous
            </button>
          </Link>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button
            aria-label="Next page"
            className="px-4 py-1 hover:rounded-md cursor-auto disabled:opacity-50"
            disabled={!nextPage}
          >
            Next
          </button>
        )}
        {nextPage && (
          <Link
            href={`/${sectionName}/page/${parseInt(currentPage.toString()) + 1}`}
            passHref
            aria-label={`Next page of ${sectionName}`}
          >
            <button
              className="px-4 py-1 hover:rounded-md special-underline-new"
              aria-label="Next page"
            >
              Next
            </button>
          </Link>
        )}
      </nav>
    </div>
  )
}
