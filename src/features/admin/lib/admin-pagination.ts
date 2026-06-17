export const ADMIN_PAGE_SIZE = 10

export type AdminPagination = {
  page: number
  pageSize: number
  total: number
  totalPages: number
}

export function buildAdminPagination(
  total: number,
  page: number,
  pageSize: number,
): AdminPagination {
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const safePage = Math.min(Math.max(page, 1), totalPages)

  return {
    page: safePage,
    pageSize,
    total,
    totalPages,
  }
}

export function getAdminSkip(page: number, pageSize: number) {
  return (page - 1) * pageSize
}
