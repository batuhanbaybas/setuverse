import { useMutation, useQueryClient } from '@tanstack/react-query'

import { queryKeys } from '#/features/admin/lib/query-keys'

import {
  adminApproveSetupFn,
  adminDeleteSetupFn,
  adminRejectSetupFn,
} from '../server/admin-setup-actions.functions'
import type { AdminSetupIdInput } from '../server/lib/admin-setup-input-schemas'

function useInvalidateAdminSetupQueries() {
  const queryClient = useQueryClient()

  return async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: [queryKeys.getAdminSetups] }),
      queryClient.invalidateQueries({ queryKey: [queryKeys.getAdminOverview] }),
    ])
  }
}

export function useAdminApproveSetup() {
  const invalidate = useInvalidateAdminSetupQueries()

  return useMutation({
    mutationKey: [queryKeys.adminApproveSetup],
    mutationFn: (input: AdminSetupIdInput) =>
      adminApproveSetupFn({ data: input }),
    onSuccess: invalidate,
  })
}

export function useAdminRejectSetup() {
  const invalidate = useInvalidateAdminSetupQueries()

  return useMutation({
    mutationKey: [queryKeys.adminRejectSetup],
    mutationFn: (input: AdminSetupIdInput) =>
      adminRejectSetupFn({ data: input }),
    onSuccess: invalidate,
  })
}

export function useAdminDeleteSetup() {
  const invalidate = useInvalidateAdminSetupQueries()

  return useMutation({
    mutationKey: [queryKeys.adminDeleteSetup],
    mutationFn: (input: AdminSetupIdInput) =>
      adminDeleteSetupFn({ data: input }),
    onSuccess: invalidate,
  })
}
