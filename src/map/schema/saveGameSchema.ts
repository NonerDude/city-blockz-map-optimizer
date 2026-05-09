/** Bump when persisted save JSON shape breaks older readers (independent from single-map snippet version). */
export const SAVE_GAME_SCHEMA_VERSION = 1

/** Row inside `SaveFileV1.maps` describing one board blob. */
export interface SaveMapEntryV1 {
  id?: string
  displayName?: string
  width: number
  height: number
  holeKeys?: readonly string[]
  placements: unknown
  progression?: unknown
}

/** Full-game persistence: multiple boards per save/export. */
export interface SaveFileV1 {
  schemaVersion: typeof SAVE_GAME_SCHEMA_VERSION
  name?: string
  maps: SaveMapEntryV1[]
}
