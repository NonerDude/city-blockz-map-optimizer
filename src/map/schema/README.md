# Map file schema (`src/map/schema`)

Defines the **serialized** representation of a map: the object shape written to disk or exchanged when users import/export.

## Why separate from `types.ts`

- `GameMapState` is optimized for editing and algorithms (arrays, enums, redundant indexes).
- `MapFileV*` is optimized for stability (explicit `schemaVersion`, optional migration, human-readable metadata).

Different concerns → different types, with serialization mapping between them.

## Versioning

- Export a **`schemaVersion`** number (or string) with every file.
- When you break compatibility, bump the version (e.g. `MapFileV2`) and optionally add migrations in [`../serialization.ts`](../serialization.ts).
- Older clients can refuse unknown versions or run upgraders explicitly.

## This folder

[`mapFileSchema.ts`](./mapFileSchema.ts) holds the canonical types/constants for **v1**. Add `mapFileSchema.v2.ts` (or parallel files) when you introduce breaking changes rather than overloading one giant interface.

## Operations mapping

| Operation | Typical flow |
|-----------|----------------|
| Save | `GameMapState` → `encodeMapFile` → `MapFileV1` → JSON string |
| Load | JSON string → `MapFileV1` → validate → `decodeMapFile` → `GameMapState` |
| Import | Same as load; UI supplies `File` / string |
| Export | Same as save; UI triggers download |
