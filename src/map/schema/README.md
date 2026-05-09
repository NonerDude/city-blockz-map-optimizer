# Serialized shapes (`src/map/schema`)

Two complementary contracts:

## `SaveFileV1` + `SaveMapEntryV1`

Full **game persistence** surfaced as an ordered **`maps`** array (`saveGameSchema.ts`). Each entry carries bounding box dimensions, **`holeKeys`**, serialized placements, optional progression blobs, labels/IDs for UI grouping.

Prefer this path whenever you import/export the **whole save slot** backing multiple simultaneous boards.

## `MapFileV1`

Single-board **transfer / clip** payloads (`mapFileSchema.ts`) when you deliberately isolate one geometry + placement bundle without implying the broader multi-save structure.

## Versioning

- `SAVE_GAME_SCHEMA_VERSION` and `MAP_FILE_SCHEMA_VERSION` may diverge; bump whichever file shape broke.
- Migrations belong next to serializers in [`../serialization.ts`](../serialization.ts) and [`../saveSerialization.ts`](../saveSerialization.ts).

## Ops cheat sheet

| Operation | Typical target |
|-----------|----------------|
| Save whole game | `encodeSaveFile` → `SaveFileV1`
| Import whole game JSON | Parse → validate `schemaVersion` → `decodeSaveFile`
| Export one board snippet | Slice active entry or build `MapFileV1`
