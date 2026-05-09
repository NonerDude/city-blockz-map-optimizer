/** Bump when exported JSON breaks older readers. */
export const MAP_FILE_SCHEMA_VERSION = 1

/** Single-board interchange (tests, presets, snippets). Use `SaveFileV1` when persisting multi-map saves. */
export interface MapFileV1 {
  schemaVersion: typeof MAP_FILE_SCHEMA_VERSION
  name?: string
  map: unknown
}
