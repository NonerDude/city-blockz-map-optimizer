import type { GameMapState } from '../map/types'
import { estimateCityPopulation } from '../rules/population'

export interface OptimizationResult {
  suggestion?: GameMapState
  messages: readonly string[]
}

/** Objective snapshot + placeholder for future search. */
export function optimizePopulation(map: GameMapState): OptimizationResult {
  const pop = estimateCityPopulation(map)
  return {
    messages: [
      `Estimated city population (tier stub totals): ${pop}.`,
      'Exhaustive layout search not implemented yet.',
    ],
  }
}
