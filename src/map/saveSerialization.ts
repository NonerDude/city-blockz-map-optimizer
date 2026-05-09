import type { SaveFileV1, SaveMapEntryV1 } from './schema/saveGameSchema'
import { SAVE_GAME_SCHEMA_VERSION } from './schema/saveGameSchema'
import type { GameMapState } from './types'
import type { BoardSpec } from './types'
import type { PlacedBuilding } from './cell'
import { parsePlacedBuilding } from './cell'
import type { ProgressionSnapshot } from '../rules/types'
import { emptyProgression } from '../rules/types'

export type DecodeSaveFileResult =
  | { ok: true; maps: readonly GameMapState[] }
  | { ok: false; error: string }

function isNumber(n: unknown): n is number {
  return typeof n === 'number' && Number.isFinite(n)
}

function parseBoardFromEntry(entry: SaveMapEntryV1): BoardSpec | null {
  if (!isNumber(entry.width) || !isNumber(entry.height)) return null
  if (entry.width < 1 || entry.height < 1) return null
  const holeKeys = Array.isArray(entry.holeKeys)
    ? entry.holeKeys.filter((k): k is string => typeof k === 'string')
    : []
  return { width: entry.width, height: entry.height, holeKeys }
}

function parsePlacements(value: unknown): Record<string, PlacedBuilding | undefined> | null {
  if (value === null || value === undefined) return {}
  if (typeof value !== 'object') return null
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

/** Hydrate runtime maps after JSON.parse + basic validation/migration hooks. */
export function decodeSaveFile(file: SaveFileV1): DecodeSaveFileResult {
  if (file.schemaVersion !== SAVE_GAME_SCHEMA_VERSION) {
    return { ok: false, error: `Unsupported schemaVersion ${String(file.schemaVersion)}.` }
  }
  if (!Array.isArray(file.maps)) {
    return { ok: false, error: 'Missing maps array.' }
  }

  const out: GameMapState[] = []
  for (let i = 0; i < file.maps.length; i++) {
    const entry = file.maps[i]
    const board = parseBoardFromEntry(entry)
    if (!board) {
      return { ok: false, error: `Invalid board at maps[${i}].` }
    }
    const cells = parsePlacements(entry.placements)
    if (!cells) {
      return { ok: false, error: `Invalid placements at maps[${i}].` }
    }
    const progression = parseProgression(entry.progression)
    out.push({
      board,
      revision: 0,
      cells,
      progression,
    })
  }

  return { ok: true, maps: out }
}

/** Flatten boards for download / cloud persistence. */
export function encodeSaveFile(maps: readonly GameMapState[]): SaveFileV1 | null {
  const entries: SaveMapEntryV1[] = maps.map((m, index) => {
    const placements: Record<string, PlacedBuilding> = {}
    for (const [k, v] of Object.entries(m.cells)) {
      if (v) placements[k] = v
    }
    return {
      id: `map-${index}`,
      width: m.board.width,
      height: m.board.height,
      holeKeys: [...m.board.holeKeys],
      placements,
      progression: m.progression,
    }
  })
  return {
    schemaVersion: SAVE_GAME_SCHEMA_VERSION,
    maps: entries,
  }
}
