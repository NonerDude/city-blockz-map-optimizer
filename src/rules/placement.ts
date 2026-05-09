import { coordKey } from '../map/coords'
import { isPlayableCell } from '../map/boardUtils'
import { parsePlacedBuilding, isBuildingTierId, type BuildingTierId } from '../map/cell'
import type { GameMapState } from '../map/types'
import type { BuildingTier } from './types'
import { estimateCityPopulation } from './population'
import { isTierUnlockedForCityPopulation } from './unlocks'
import {
  FREEDOM_ROOF_UNLOCK_ID,
  UNLOCK_MIN_CITY_POPULATION,
} from './tierConstants'

/** Outcome surface for UX + algorithm branching. */
export interface PlacementDecision {
  allowed: boolean
  detail?: string
}

export interface PlacementOptions {
  /**
   * Place using that tier’s **freedom roof** (ignore orthogonal adjacency rules).
   * Requires `progression.roofUnlocks` to contain the matching `freedom-roof-*` token for red/green/yellow.
   * Ignored for blue (already place-anywhere).
   */
  usingFreedomRoof?: boolean
}

const ORTHO_DR = [-1, 0, 1, 0] as const
const ORTHO_DC = [0, 1, 0, -1] as const

function orthogonalNeighborTiers(map: GameMapState, row: number, col: number): Set<BuildingTierId> {
  const tiers = new Set<BuildingTierId>()
  for (let i = 0; i < 4; i++) {
    const nr = row + ORTHO_DR[i]
    const nc = col + ORTHO_DC[i]
    if (!isPlayableCell(map.board, nr, nc)) continue
    const b = parsePlacedBuilding(map.cells[coordKey(nr, nc)])
    if (b) tiers.add(b.tier)
  }
  return tiers
}

function adjacencyAllows(tier: BuildingTierId, neighbors: Set<BuildingTierId>): boolean {
  switch (tier) {
    case 'blue':
      return true
    case 'red':
      return neighbors.has('blue')
    case 'green':
      return neighbors.has('blue') && neighbors.has('red')
    case 'yellow':
      return neighbors.has('blue') && neighbors.has('red') && neighbors.has('green')
    default:
      return false
  }
}

function hasFreedomRoofUnlock(map: GameMapState, tier: Exclude<BuildingTierId, 'blue'>): boolean {
  const id = FREEDOM_ROOF_UNLOCK_ID[tier]
  return map.progression.roofUnlocks.includes(id)
}

/**
 * Central hook for tier-specific adjacency, cumulative-population unlocks, and freedom roofs.
 * Uses orthogonal neighbours only (no diagonals). Population estimate uses stub tier totals from `tierConstants`.
 */
export function evaluatePlacement(
  map: GameMapState,
  tier: BuildingTier,
  row: number,
  col: number,
  options?: PlacementOptions,
): PlacementDecision {
  if (!isBuildingTierId(tier)) {
    return { allowed: false, detail: `Unknown tier "${String(tier)}".` }
  }

  if (!isPlayableCell(map.board, row, col)) {
    return { allowed: false, detail: 'Cell is out of bounds or a hole.' }
  }

  const key = coordKey(row, col)
  if (parsePlacedBuilding(map.cells[key])) {
    return { allowed: false, detail: 'Cell already occupied.' }
  }

  const cityPop = estimateCityPopulation(map)
  if (!isTierUnlockedForCityPopulation(tier, cityPop)) {
    return {
      allowed: false,
      detail: `Tier ${tier} locked until city population ≥ ${UNLOCK_MIN_CITY_POPULATION[tier]} (currently ~${cityPop}).`,
    }
  }

  if (tier === 'blue') {
    return { allowed: true }
  }

  const useFreedom = options?.usingFreedomRoof === true
  if (useFreedom) {
    if (!hasFreedomRoofUnlock(map, tier)) {
      return {
        allowed: false,
        detail: `Freedom roof for ${tier} not unlocked (missing ${FREEDOM_ROOF_UNLOCK_ID[tier]} in progression.roofUnlocks).`,
      }
    }
    return { allowed: true }
  }

  const neighbors = orthogonalNeighborTiers(map, row, col)
  if (adjacencyAllows(tier, neighbors)) {
    return { allowed: true }
  }

  return {
    allowed: false,
    detail: `Orthogonal adjacency not satisfied for ${tier} (neighbours present: ${[...neighbors].sort().join(', ') || 'none'}).`,
  }
}
