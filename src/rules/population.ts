import type { GameMapState } from '../map/types'
import { parsePlacedBuilding } from '../map/cell'
import { ESTIMATED_POPULATION_BY_TIER } from './tierConstants'

/** Sum tier stub populations for all placed buildings (sparse `cells`). */
export function estimateCityPopulation(map: GameMapState): number {
  let sum = 0
  for (const raw of Object.values(map.cells)) {
    const b = parsePlacedBuilding(raw)
    if (b) sum += ESTIMATED_POPULATION_BY_TIER[b.tier]
  }
  return sum
}
