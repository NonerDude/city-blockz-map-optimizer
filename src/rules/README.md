# Rules (`src/rules`)

Answers **placement and progression questions** independently of React and independently of brute-force optimizers.

## Why this exists

City Blockz-style flows mix several mechanisms:

| Mechanism | Example (informal) | Implementation direction |
|-----------|---------------------|---------------------------|
| Tier unlock sequencing | Only blue initially; reds after first blues | Stateful checks against `progression` + neighbor scan |
| Adjacency prerequisites | Yellow must satisfy red+green+blue patterns | Predicate per tier, possibly composed |
| Roof modifiers | “Blue roofs” lifting neighbor restrictions | `progression.roofUnlocks` (or finer flags) toggles alternative predicates |
| Demolish | Remove buildings → might affect unlock/roof replay | Extend `progression.meta` + explicit demolish ledger once rules are understood |

These details are **still being discovered**. This package should grow as **small composable predicates** (`canPlaceTierX`, roof helpers, demolish-validity) rather than a single giant switch, so tweaks do not ripple through `GameMapState` or the serializer.

## Data vs logic

| Package | Holds |
|---------|-------|
| [`src/map`](../map/README.md) | **Facts**: board mask, placements, revisions |
| **`src/rules` (here)** | **Legality queries**: given facts + coords, OK or not—and why |
| [`src/algorithm`](../algorithm/README.md) | **Search/heuristics**: explore legal moves to maximize population |

## Files

| Path | Role |
|------|------|
| [`types.ts`](./types.ts) | `BuildingTier`, `ProgressionSnapshot`, helpers |
| [`placement.ts`](./placement.ts) | `evaluatePlacement` — central hook expanding into modules later |

Consult [`docs/DOMAIN.md`](../../docs/DOMAIN.md) for narrative context plus open questions around roofs/demolish.
