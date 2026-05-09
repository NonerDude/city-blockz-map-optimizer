import type { BuildingTierId } from '../map/cell'
import { UNLOCK_MIN_CITY_POPULATION } from './tierConstants'

/** Whether cumulative estimated city population satisfies the tier gate (before placing the new building). */
export function isTierUnlockedForCityPopulation(
  tier: BuildingTierId,
  estimatedCityPopulation: number,
): boolean {
  return estimatedCityPopulation >= UNLOCK_MIN_CITY_POPULATION[tier]
}
