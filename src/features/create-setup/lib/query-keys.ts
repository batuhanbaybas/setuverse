export const queryKeys = {
  uploadSetupImage: 'upload-setup-image',
  deleteSetupImage: 'delete-setup-image',
  createSetup: 'create-setup',
  getSetupDraft: (setupId: string) => ['get-setup-draft', setupId],
  getSetupItems: (setupId: string) => ['get-setup-items', setupId],
  updateSetupInfo: 'update-setup-info',
  updateSetupItems: 'update-setup-items',
  addSetupItem: 'add-setup-item',
  updateSetupItem: 'update-setup-item',
  deleteSetupItem: 'delete-setup-item',
  updateSetupImageUrl: 'update-setup-image-url',
  publishSetup: 'publish-setup',
} as const
