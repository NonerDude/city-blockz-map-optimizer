/** Primary building tiers (extend as the game taxonomy grows). */
export type BuildingTier = 'blue' | 'red' | 'green' | 'yellow' | (string & {})

/**
 * Progression/roof/unlock baggage carried alongside [`GameMapState`](../map/types.ts).
 *
 * Population-gated trophy roofs (`populationMilestones.ts`) do **not** automatically change placement predicates;
 * unlock when documented per roof. Example: residential blue’s first trophy (1400 population) is cosmetic milestone only—see **`docs/DOMAIN.md`**.
 */
export interface ProgressionSnapshot {
  /**
   * Opaque unlock tokens from persisted saves (`trophy-residential-blue`, cosmetics, …).
   * Prefer deriving milestone trophies via scorer population + helpers in [`populationMilestones`](./populationMilestones.ts), and hydrate explicit tokens only from exported saves.
   */
  readonly roofUnlocks: readonly string[]
  /** Last computed aggregate population for milestone UI / trophies. */
  readonly lastComputedPopulation?: number
  /** Placeholder counters or flags tied to demolition or story beats. */
  readonly meta: Readonly<Record<string, unknown>>
}

export function emptyProgression(): ProgressionSnapshot {
  return { roofUnlocks: [], meta: {} }
}
