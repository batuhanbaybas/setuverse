export type SetupPhoto = {
  file: File
  previewUrl: string
}

export type CreateSetupFormValues = {
  photo?: SetupPhoto
}

export const createSetupDefaultValues: CreateSetupFormValues = {}
