import type { MapFileV1 } from './schema/mapFileSchema'
import { MAP_FILE_SCHEMA_VERSION } from './schema/mapFileSchema'
import type { GameMapState } from './types'
import type { BoardSpec } from './types'
import type { PlacedBuilding } from './cell'
import { parsePlacedBuilding } from './cell'
import type { ProgressionSnapshot } from '../rules/types'
import { emptyProgression } from '../rules/types'

export type DecodeMapFileResult =
  | { ok: true; map: GameMapState }
  | { ok: false; error: string }

function isNumber(n: unknown): n is number {
  return typeof n === 'number' && Number.isFinite(n)
}

function parseBoard(value: unknown): BoardSpec | null {
  if (!value || typeof value !== 'object') return null
  const o = value as Record<string, unknown>
  if (!isNumber(o.width) || !isNumber(o.height)) return null
  if (o.width < 1 || o.height < 1) return null
  if (!Array.isArray(o.holeKeys)) return null
  const holeKeys = o.holeKeys.filter((k): k is string => typeof k === 'string')
  return { width: o.width, height: o.height, holeKeys }
}

function parseCells(value: unknown): Record<string, PlacedBuilding | undefined> | null {
  if (!value || typeof value !== 'object') return null
  const o = value as Record<string, unknown>
  const out: Record<string, PlacedBuilding | undefined> = {}
  for (const [k, v] of Object.entries(o)) {
    if (v === null || v === undefined) {
      out[k] = undefined
      continue
    }
    const b = parsePlacedBuilding(v)
    if (!b) return null
    out[k] = b
  }
  return out
}

function parseProgression(value: unknown): ProgressionSnapshot {
  if (!value || typeof value !== 'object') return emptyProgression()
  const o = value as Record<string, unknown>
  const roofUnlocks = Array.isArray(o.roofUnlocks)
    ? o.roofUnlocks.filter((t): t is string => typeof t === 'string')
    : []
  const last =
    isNumber(o.lastComputedPopulation) ? o.lastComputedPopulation : undefined
  const meta =
    o.meta && typeof o.meta === 'object' && o.meta !== null
      ? (o.meta as Readonly<Record<string, unknown>>)
      : {}
  return { roofUnlocks, ...(last !== undefined ? { lastComputedPopulation: last } : {}), meta }
}

/** Deserialize after JSON parse / import (validate, migrate, hydrate). */
export function decodeMapFile(file: MapFileV1): DecodeMapFileResult {
  if (file.schemaVersion !== MAP_FILE_SCHEMA_VERSION) {
    return { ok: false, error: `Unsupported schemaVersion ${String(file.schemaVersion)}.` }
  }

  const payload = file.map
  if (!payload || typeof payload !== 'object') {
    return { ok: false, error: 'Missing map payload.' }
  }
  const root = payload as Record<string, unknown>
  const board = parseBoard(root.board)
  if (!board) return { ok: false, error: 'Invalid board spec.' }

  const cellsRaw = root.cells !== undefined ? root.cells : {}
  const cells = parseCells(cellsRaw)
  if (!cells) return { ok: false, error: 'Invalid cells record.' }

  const progression = parseProgression(root.progression)

  const map: GameMapState = {
    board,
    revision: isNumber(root.revision) ? Math.floor(root.revision) : 0,
    cells,
    progression,
  }

  return { ok: true, map }
}

/** Serialize for save / export. */
export function encodeMapFile(state: GameMapState): MapFileV1 | null {
  const cellsOut: Record<string, PlacedBuilding> = {}
  for (const [k, v] of Object.entries(state.cells)) {
    if (v) cellsOut[k] = v
  }
  return {
    schemaVersion: MAP_FILE_SCHEMA_VERSION,
    name: undefined,
    map: {
      board: state.board,
      revision: state.revision,
      cells: cellsOut,
      progression: state.progression,
    },
  }
}
