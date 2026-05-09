import type { BuildingTierId } from '../map/cell'

/** Per-building population contribution used as the optimisation objective until in-game scoring is modelled in detail. */
export const ESTIMATED_POPULATION_BY_TIER: Record<BuildingTierId, number> = {
  blue: 75,
  red: 250,
  green: 800,
  yellow: 2200,
}

/**
 * Minimum **cumulative estimated city population** before placing this tier (mobile stub).
 * Aligns with tier numbers: red after 250 total, green after 800, yellow after 2200.
 */
export const UNLOCK_MIN_CITY_POPULATION: Record<BuildingTierId, number> = {
  blue: 0,
  red: 250,
  green: 800,
  yellow: 2200,
}

/** Tokens in `progression.roofUnlocks` granting placement-anywhere for non-blue tiers. */
export const FREEDOM_ROOF_UNLOCK_ID: Record<Exclude<BuildingTierId, 'blue'>, string> = {
  red: 'freedom-roof-red',
  green: 'freedom-roof-green',
  yellow: 'freedom-roof-yellow',
}
