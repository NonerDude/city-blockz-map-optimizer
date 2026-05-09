# Map (`src/map`)

Domain layer for the City Blockz grid: dimensions, cell contents, and operations that make sense in code (clone, mutate, query neighbors, etc.).

## Layout

| Path | Purpose |
|------|---------|
| [`types.ts`](./types.ts) | In-memory model (`GameMapState`, cell/building types as you define them). |
| [`schema/`](./schema/README.md) | **Versioned** JSON (or other) shape for files: what “save” writes and “load” reads. |
| [`serialization.ts`](./serialization.ts) | Bridge between file/wire data and `GameMapState` (validate `schemaVersion`, migrate old files, encode for export). |

## Save / load / import / export

- **Save** — serialize current `GameMapState` to the latest `MapFileV*` object, then stringify (e.g. JSON) for storage.
- **Load** — read stored bytes, parse, validate schema version, `decodeMapFile`-style pathway into `GameMapState`.
- **Import** — same as load, usually from user-provided files (possibly different wrappers or MIME types).
- **Export** — same as save, oriented toward download or clipboard; reuse the schema types so every path shares one contract.

Keeping the **schema** separate from UI and algorithm avoids duplicating field names and version checks across the app.

## Relation to other layers

- **UI** calls into `serialization` and holds the active `GameMapState` (or lifts it via state management later).
- **Algorithm** consumes `GameMapState` only; it should not parse JSON directly.
