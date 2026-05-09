/** Bump when exported JSON breaks older readers. */
export const MAP_FILE_SCHEMA_VERSION = 1

/**
 * Canonical on-disk / transfer shape for {@link MAP_FILE_SCHEMA_VERSION}.
 * Expand `map` from `unknown` once cell/building payloads are specified.
 */
export interface MapFileV1 {
  schemaVersion: typeof MAP_FILE_SCHEMA_VERSION
  name?: string
  map: unknown
}
