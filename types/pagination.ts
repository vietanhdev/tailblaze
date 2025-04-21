// Pagination type used across list layouts
export interface Pagination {
  currentPage: number
  totalPages: number
}

// Helper function to calculate pagination
export function calculatePagination(
  totalItems: number,
  itemsPerPage: number,
  currentPage: number = 1
): Pagination {
  return {
    currentPage,
    totalPages: Math.ceil(totalItems / itemsPerPage),
  }
}
