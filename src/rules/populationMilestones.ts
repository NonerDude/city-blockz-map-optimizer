/** Stable token persisted in `progression.roofUnlocks` when mirroring exported saves / UI badges. */
export const TROPHY_RESIDENTIAL_BLUE_ID = 'trophy-residential-blue' as const

/**
 * First **trophy roof** for the residential (blue) building unlocks once city population reaches this threshold.
 *
 * Important: unlocking this trophy **does not** change placement predicates for blue—the residential
 * building already obeys the “built anywhere” policy, so trophy progression is orthogonal to placement legality.
 */
export const RESIDENTIAL_BLUE_TROPHY_POPULATION_GATE = 1400

/** Whether the residential blue trophy cosmetic has unlocked given a total population tally. */
export function isResidentialBlueTrophyUnlocked(totalPopulation: number): boolean {
  return totalPopulation >= RESIDENTIAL_BLUE_TROPHY_POPULATION_GATE
}
