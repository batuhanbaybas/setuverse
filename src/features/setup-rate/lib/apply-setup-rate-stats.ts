import type { InfiniteData } from '@tanstack/react-query'

import type { GetPublishedSetupsResult } from '#/features/home/server/get-published-setups.functions'

import type { SetupRateStats } from './compute-optimistic-rate-stats'

export type SetupWithOptionalRateStats = {
  id: string
  averageRate?: number | null
  ratingsCount?: number
}

export function applyRateStatsToSetup<T extends SetupWithOptionalRateStats>(
  setup: T,
  stats: SetupRateStats,
): T {
  return {
    ...setup,
    averageRate: stats.averageRate,
    ratingsCount: stats.ratingsCount,
  }
}

export function applyRateStatsToSetupList<T extends SetupWithOptionalRateStats>(
  setups: T[],
  setupId: string,
  stats: SetupRateStats,
): T[] {
  return setups.map((setup) =>
    setup.id === setupId ? applyRateStatsToSetup(setup, stats) : setup,
  )
}

export function applyRateStatsToPublishedSetups(
  data: InfiniteData<GetPublishedSetupsResult> | undefined,
  setupId: string,
  stats: SetupRateStats,
) {
  if (!data) {
    return data
  }

  return {
    ...data,
    pages: data.pages.map((page) => ({
      ...page,
      setups: applyRateStatsToSetupList(page.setups, setupId, stats),
    })),
  }
}

export function findSetupRateStatsInPublishedQueries(
  queries: [readonly unknown[], InfiniteData<GetPublishedSetupsResult> | undefined][],
  setupId: string,
) {
  for (const [, data] of queries) {
    for (const page of data?.pages ?? []) {
      const setup = page.setups.find((item) => item.id === setupId)

      if (setup) {
        return {
          averageRate: setup.averageRate,
          ratingsCount: setup.ratingsCount,
        }
      }
    }
  }

  return null
}
