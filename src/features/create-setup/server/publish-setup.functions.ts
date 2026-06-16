import { createServerFn } from '@tanstack/react-start'

import { requireSession } from '#/features/auth/lib/require-session'

import {
  publishDraftSetup,
  type PublishDraftSetupResult,
} from './lib/publish-draft-setup'
import {
  publishSetupInputSchema,
  type PublishSetupInput,
} from './lib/setup-input-schemas'

export type { PublishSetupInput }
export type PublishSetupResult = PublishDraftSetupResult

export const publishSetupFn = createServerFn({ method: 'POST' })
  .validator(publishSetupInputSchema)
  .handler(async ({ data }): Promise<PublishSetupResult> => {
    const session = await requireSession()

    return publishDraftSetup({
      setupId: data.setupId,
      userId: session.user.id,
    })
  })
