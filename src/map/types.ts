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
 * One editable / optimizable City Blockz-style board plus progression facts the rules engine needs.
 * Keep **placement legality out of this record** — query [`src/rules`](../rules/README.md).
 */
export interface GameMapState {
  readonly board: BoardSpec
  /** User-driven revision / undo bookkeeping; harmless for algorithms that ignore it. */
  revision: number
  /**
   * Sparse building placements keyed by coord. Replace `unknown` with a concrete cell union
   * (empty / building tier / roof metadata) once modelling stabilizes.
   */
  readonly cells: Readonly<Record<string, unknown>>
  /** Locks, roofs, demolish-derived flags — see rules package. */
  readonly progression: ProgressionSnapshot
}
