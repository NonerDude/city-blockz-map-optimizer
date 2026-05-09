# Map (`src/map`)

Domain layer for irregular square boards (commonly **`5 × 5` with holes**) plus serialization.

## Layout

| Path | Purpose |
|------|---------|
| [`coords.ts`](./coords.ts) | `coordKey` / helpers for sparse `Record` keys covering holes & placements |
| [`types.ts`](./types.ts) | `BoardSpec`, `GameMapState` (+ embedded [`ProgressionSnapshot`](../rules/types.ts))
| [`schema/`](./schema/README.md) | **`MapFileV1`** snippets vs **`SaveFileV1`** aggregates (multi-map game saves) |
| [`serialization.ts`](./serialization.ts) | Single-board encode/decode (`MapFileV1`)
| [`saveSerialization.ts`](./saveSerialization.ts) | Multi-board encode/decode (`SaveFileV1`)

## Facts vs rules

[`GameMapState`](./types.ts) stores immutable board geometry (`holeKeys`), sparse `cells`, and a **progression snapshot** for roofs/unlocks/metadata. Query [`src/rules`](../rules/README.md) whenever you ask “may I place or demolish this tier here?” rather than burying predicates inside React components.

## Save / load / import / export

| Artifact | Typical use |
|----------|-------------|
| `SaveFileV1` | Mirrors a **game save** with **many boards** (`encodeSaveFile` / `decodeSaveFile`). |
| `MapFileV1` | Lightweight **single-board** snippets (share presets, clipboard, tests). |

## Relation to other layers

- **UI** hydrates **`SaveFileV1`**, keeps an array plus “active board” index (or IDs), persists back through serializers.
- **Algorithm** consumes `GameMapState` and must respect **rules**: either call helpers in `rules` explicitly or traverse only cells returned by validated placement iterators you build atop them.
