import type { GameMapState } from '../map/types'

export interface OptimizationResult {
  suggestion?: GameMapState
  messages: readonly string[]
}

/** Given a map, return a better layout or scoring guidance. */
export function optimizePopulation(_map: GameMapState): OptimizationResult {
  void _map
  return { messages: ['optimizePopulation is not implemented yet.'] }
}
