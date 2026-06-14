export type SetupPhoto = {
  file: File
  previewUrl: string
  sourceFile: File
}

export type CreateSetupFormValues = {
  photo?: SetupPhoto
}

export const createSetupDefaultValues: CreateSetupFormValues = {}
