export const CREATE_FLOW_STEPS = [
  { label: 'Upload Image', path: null },
  { label: 'Setup Info', path: 'info' },
  { label: 'Tag Items', path: 'tags' },
  { label: 'Review', path: 'review' },
] as const

export const CREATE_FLOW_TOTAL_STEPS = CREATE_FLOW_STEPS.length

export function getCurrentFlowStepIndex(pathname: string): number {
  const normalized = pathname.replace(/\/$/, '') || '/'

  if (normalized === '/create') {
    return 0
  }

  const stepIndex = CREATE_FLOW_STEPS.findIndex(
    (step) => step.path != null && normalized === `/create/${step.path}`,
  )

  return stepIndex === -1 ? 0 : stepIndex
}
