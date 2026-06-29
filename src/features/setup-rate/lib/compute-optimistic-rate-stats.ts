export type SetupRateStats = {
  averageRate: number
  ratingsCount: number
}

export function computeOptimisticRateStats({
  previousAverage,
  previousCount,
  previousUserRate,
  nextRate,
}: {
  previousAverage?: number | null
  previousCount?: number
  previousUserRate?: number | null
  nextRate: number
}): SetupRateStats {
  const count = previousCount ?? 0
  const average = previousAverage ?? 0

  if (previousUserRate != null && count > 0) {
    const total = average * count - previousUserRate + nextRate

    return {
      averageRate: total / count,
      ratingsCount: count,
    }
  }

  const nextCount = count + 1
  const total = average * count + nextRate

  return {
    averageRate: total / nextCount,
    ratingsCount: nextCount,
  }
}
