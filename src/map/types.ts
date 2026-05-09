import type { PlacedBuilding } from './cell'
import type { ProgressionSnapshot } from '../rules/types'

/**
 * Bounding box + **holes**. Game boards are commonly ~5×5 with varying void cells;
 * width/height stay explicit so tooling never hardcodes constants.
 */
export interface BoardSpec {
  readonly width: number
  readonly height: number
  /** Cells outside the playable footprint (holes), stored as coord keys from [`coordKey`](./coords.ts). */
  readonly holeKeys: readonly string[]
}

/**
 * One editable / optimizable City Bloxx-style board plus progression facts the rules engine needs.
 * Placement legality → [`evaluatePlacement`](../rules/placement.ts).
 */
export interface GameMapState {
  readonly board: BoardSpec
  revision: number
  /** Sparse placements keyed by `row,col`. Absent key = empty cell. */
  readonly cells: Readonly<Record<string, PlacedBuilding | undefined>>
  readonly progression: ProgressionSnapshot
}
