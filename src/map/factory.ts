import { coordKey } from './coords'
import type { BoardSpec, GameMapState } from './types'
import { emptyProgression } from '../rules/types'

export interface CreateBoardOptions {
  readonly width: number
  readonly height: number
  /** Hole coordinates as `[row, col][]`. */
  readonly holes?: readonly (readonly [number, number])[]
}

export function createBoardSpec(options: CreateBoardOptions): BoardSpec {
  const { width, height, holes = [] } = options
  const holeKeys = holes.map(([row, col]) => coordKey(row, col))
  return { width, height, holeKeys }
}

export function createEmptyGameMapState(options: CreateBoardOptions): GameMapState {
  return {
    board: createBoardSpec(options),
    revision: 0,
    cells: {},
    progression: emptyProgression(),
  }
}

/** Convenience for the common ~5×5 full grid. */
export function createDemoFiveByFive(): GameMapState {
  return createEmptyGameMapState({ width: 5, height: 5 })
}
