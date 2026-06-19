export type HomePagination = {
  page: number
  pageSize: number
  total: number
  totalPages: number
}

export function buildHomePagination(
  total: number,
  page: number,
  pageSize: number,
): HomePagination {
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const safePage = Math.min(Math.max(page, 1), totalPages)

  return {
    page: safePage,
    pageSize,
    total,
    totalPages,
  }
}
