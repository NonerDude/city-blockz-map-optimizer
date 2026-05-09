# Algorithm (`src/algorithm`)

Population / scoring optimization: given a **`GameMapState`**, propose better building arrangements or compute scores according to rules you derive from City Blockz.

## Design guidelines

- **Pure functions** preferred: same input → same output, easier to test and rerun.
- **Depend only on [`src/map`](../map/README.md)** for types (`GameMapState`, building enums, etc.).
- Avoid importing from `src/ui`; keep React out of this tree.

## Entry points

[`optimize.ts`](./optimize.ts) will grow into the public API (`optimizePopulation`, helpers, scorer). Stub exports exist so `map` and `ui` can depend on stable function names early.

## Performance note

Later you may swap in heuristics, simulated annealing, constraint solvers, or precomputed lookups. Keeping the boundary at `optimizePopulation(map)` preserves flexibility.
