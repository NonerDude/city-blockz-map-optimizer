/** Canonical tier ids aligned with mobile City Bloxx colouring. */
export type BuildingTierId = 'blue' | 'red' | 'green' | 'yellow'

export const BUILDING_TIER_IDS: readonly BuildingTierId[] = [
  'blue',
  'red',
  'green',
  'yellow',
]

export interface PlacedBuilding {
  tier: BuildingTierId
  /**
   * Special roof granting **placement freedom** for this tier (build anywhere on playable cells).
   * Mobile rule: freedom roofs apply to red/green/yellow only; blue roofs do not change placement (already unrestricted).
   */
  hasFreedomRoof?: boolean
}

export function isBuildingTierId(value: unknown): value is BuildingTierId {
  return (
    value === 'blue' ||
    value === 'red' ||
    value === 'green' ||
    value === 'yellow'
  )
}

export function parsePlacedBuilding(value: unknown): PlacedBuilding | undefined {
  if (value === null || value === undefined) return undefined
  if (typeof value !== 'object') return undefined
  const o = value as Record<string, unknown>
  if (!isBuildingTierId(o.tier)) return undefined
  const tier = o.tier
  const hasFreedomRoof = o.hasFreedomRoof === true
  return hasFreedomRoof ? { tier, hasFreedomRoof: true } : { tier }
}
