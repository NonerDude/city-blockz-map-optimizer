import type { SaveFileV1 } from './schema/saveGameSchema'
import type { GameMapState } from './types'

export type DecodeSaveFileResult =
  | { ok: true; maps: readonly GameMapState[] }
  | { ok: false; error: string }

/** Hydrate runtime maps after JSON.parse + basic validation/migration hooks. */
export function decodeSaveFile(_file: SaveFileV1): DecodeSaveFileResult {
  void _file
  return { ok: false, error: 'decodeSaveFile is not implemented yet.' }
}

/** Flatten boards for download / cloud persistence. */
export function encodeSaveFile(_maps: readonly GameMapState[]): SaveFileV1 | null {
  void _maps
  return null
}
