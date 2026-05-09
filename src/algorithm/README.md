# Algorithm (`src/algorithm`)

Population scoring and layout search: **`GameMapState` in, improved placements or diagnostics out.**

Current objective stub is **`estimateCityPopulation`** (sum of tier totals **75 / 250 / 800 / 2200** per [`tierConstants`](../rules/tierConstants.ts)); replace with real scoring when you have exact formulas.

## Constraints

Exploration **must obey [`src/rules`](../rules/README.md)** (`evaluatePlacement`: orthogonal adjacency, cumulative-population unlocks, freedom-roof bypass). Funnel candidate moves through those checks before evaluating population gain.

[`GameMapState`](../map/types.ts) embeds **`progression`** (`roofUnlocks`, …) so freedom-roof tokens stay authoritative.

## Imports

Prefer **depending on**:

- `../map/...` for boards and cells
- `../rules/...` for legality, population estimate, tier constants

Avoid React/DOM imports.

## Entry points

[`optimize.ts`](./optimize.ts) reports estimated population today; add exhaustive / heuristic search once scoring matches the mobile build.
