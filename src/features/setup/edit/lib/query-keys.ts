export const setupEditQueryKeys = {
  getSetupForEdit: (setupId: string) => ['get-setup-for-edit', setupId] as const,
  updatePublishedSetupInfo: 'update-published-setup-info',
} as const
