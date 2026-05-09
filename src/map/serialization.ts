import type { MapFileV1 } from './schema/mapFileSchema'
import type { GameMapState } from './types'

export type DecodeMapFileResult =
  | { ok: true; map: GameMapState }
  | { ok: false; error: string }

/** Deserialize after JSON parse / import (validate, migrate, hydrate). */
export function decodeMapFile(_file: MapFileV1): DecodeMapFileResult {
  void _file
  return { ok: false, error: 'decodeMapFile is not implemented yet.' }
}

/** Serialize for save / export — returns null until encoding exists. */
export function encodeMapFile(_state: GameMapState): MapFileV1 | null {
  void _state
  return null
}
