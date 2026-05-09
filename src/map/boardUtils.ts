import { coordKey } from './coords'
import type { BoardSpec } from './types'

export function isInside(board: BoardSpec, row: number, col: number): boolean {
  return row >= 0 && col >= 0 && row < board.height && col < board.width
}

export function isHole(board: BoardSpec, row: number, col: number): boolean {
  return board.holeKeys.includes(coordKey(row, col))
}

/** Playable = in bounds and not a hole. */
export function isPlayableCell(board: BoardSpec, row: number, col: number): boolean {
  return isInside(board, row, col) && !isHole(board, row, col)
}
