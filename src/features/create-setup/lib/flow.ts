export const CREATE_FLOW_STEPS = [
  {
    label: 'Upload Image',
    description: 'Add a clear photo of your setup.',
  },
  {
    label: 'Setup Info',
    description: 'Name your setup and choose a category.',
  },
  {
    label: 'Tag Items',
    description: 'Mark the gear and items in your photo.',
  },
  {
    label: 'Review',
    description: 'Check everything before you publish.',
  },
] as const

export function getCreateFlowProgress(pathname: string) {
  const stepIndex = getCreateFlowStepIndex(pathname)
  const step = CREATE_FLOW_STEPS[stepIndex]
  const nextStep = CREATE_FLOW_STEPS[stepIndex + 1]

  return {
    stepNumber: stepIndex + 1,
    totalSteps: CREATE_FLOW_STEPS.length,
    label: step.label,
    description: step.description,
    nextLabel: nextStep?.label ?? null,
    value: Math.round(((stepIndex + 1) / CREATE_FLOW_STEPS.length) * 100),
  }
}

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
