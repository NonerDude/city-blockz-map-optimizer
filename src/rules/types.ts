import type { BuildingTierId } from '../map/cell'

export type BuildingTier = BuildingTierId

/**
 * Progression/roof/unlock baggage carried alongside [`GameMapState`](../map/types.ts).
 *
 * **Freedom roofs:** tokens like `freedom-roof-red` in `roofUnlocks` allow placing that tier with `usingFreedomRoof: true`
 * (placement anywhere on playable cells). Blue freedom roofs do not change placement rules (see placement hook).
 *
 * **Trophy roofs** (e.g. residential blue at 1400 pop) remain cosmetic where documented (`populationMilestones.ts`).
 */
export interface ProgressionSnapshot {
  /** Unlock tokens from saves / derived milestones (`freedom-roof-*`, `trophy-residential-blue`, …). */
  readonly roofUnlocks: readonly string[]
  /** Last computed aggregate population for milestone UI / trophies. */
  readonly lastComputedPopulation?: number
  readonly meta: Readonly<Record<string, unknown>>
}

export function emptyProgression(): ProgressionSnapshot {
  return { roofUnlocks: [], meta: {} }
}
