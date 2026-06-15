export const CREATE_FLOW_STEPS = [
  { label: 'Upload Image' },
  { label: 'Setup Info' },
  { label: 'Tag Items' },
  { label: 'Review' },
] as const

export function getCreateFlowStepIndex(pathname: string): number {
  const normalized = pathname.replace(/\/$/, '') || '/'

  if (normalized === '/create') {
    return 0
  }

  if (normalized.endsWith('/info')) {
    return 1
  }

  if (normalized.endsWith('/tags')) {
    return 2
  }

  if (normalized.endsWith('/review')) {
    return 3
  }

  return 0
}
