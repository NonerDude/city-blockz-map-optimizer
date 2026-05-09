export type { BuildingTier, ProgressionSnapshot } from './types'
export { emptyProgression } from './types'
export {
  RESIDENTIAL_BLUE_TROPHY_POPULATION_GATE,
  TROPHY_RESIDENTIAL_BLUE_ID,
  isResidentialBlueTrophyUnlocked,
} from './populationMilestones'
export type { PlacementDecision, PlacementOptions } from './placement'
export { evaluatePlacement } from './placement'
export { estimateCityPopulation } from './population'
export { isTierUnlockedForCityPopulation } from './unlocks'
export {
  ESTIMATED_POPULATION_BY_TIER,
  FREEDOM_ROOF_UNLOCK_ID,
  UNLOCK_MIN_CITY_POPULATION,
} from './tierConstants'
