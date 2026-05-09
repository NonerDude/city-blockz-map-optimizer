import type { GameMapState } from '../map/types'
import type { BuildingTier } from './types'

/** Outcome surface for UX + algorithm branching. */
export interface PlacementDecision {
  allowed: boolean
  detail?: string
}

/**
 * Central hook for tier-specific adjacency/roof/unlock predicates.
 * Compose smaller checks here as you learn real City Blockz rules.
 */
export function evaluatePlacement(
  _map: GameMapState,
  _tier: BuildingTier,
  _row: number,
  _col: number,
): PlacementDecision {
  void _map
  void _tier
  void _row
  void _col
  return {
    allowed: false,
    detail: 'Placement rules engine not implemented yet (see docs/DOMAIN.md).',
  }
}
