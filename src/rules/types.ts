/** Primary building tiers (extend as the game taxonomy grows). */
export type BuildingTier = 'blue' | 'red' | 'green' | 'yellow' | (string & {})

/**
 * Progression/roof/unlock baggage carried alongside [`GameMapState`](../map/types.ts).
 * Fields stay loose until demolition + roof sequencing is nailed down — prefer extending this
 * object over sprinkling booleans across the map state.
 */
export interface ProgressionSnapshot {
  readonly roofUnlocks: readonly string[]
  /** Placeholder counters or flags tied to demolition or story beats. */
  readonly meta: Readonly<Record<string, unknown>>
}

export function emptyProgression(): ProgressionSnapshot {
  return { roofUnlocks: [], meta: {} }
}
