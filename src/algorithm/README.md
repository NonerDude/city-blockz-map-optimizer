# Algorithm (`src/algorithm`)

Population scoring and layout search: **`GameMapState` in, improved placements or diagnostics out.**

## Constraints

Exploration **must obey [`src/rules`](../rules/README.md)** (`evaluatePlacement` grows into tier-specific predicates + roof toggles). Even when brute-forcing tiny `5 × 5` boards, funnel candidate generation through rule checks so demolished buildings, adjacency ladders, and “place anywhere roof” exemptions stay authoritative.

[`GameMapState`](../map/types.ts) now embeds **`progression`**, keeping unlock/roof/meta facts adjacent to the grid the algorithm mutates hypothetically—never silently invent roof states.

## Imports

Prefer **depending on**:

- `@map-domain` equivalents via relative imports (`../map/...`)
- `../rules/...` for legality predicates and tier typing

Avoid React/DOM imports.

## Entry points

[`optimize.ts`](./optimize.ts) will orchestrate heuristic / exhaustive passes per board inside a broader save bundle (caller decides which [`GameMapState`](../map/types.ts) to optimize first).
