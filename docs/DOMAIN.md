# Domain model

Captured from design discussion plus **implemented stubs** in code (`tierConstants.ts`, `placement.ts`). Remaining gaps (exact in-game scoring curve, every roof threshold, demolish edge cases) stay **data-driven** so we can extend without rewiring the grid.

External write-ups are indexed in **[`REFERENCES.md`](./REFERENCES.md)**.

## Board shape

- Typical maps are **`5 × 5` with irregular holes**: playable cells = bounding rectangle minus voids (`BoardSpec`). Scale may change—geometry stays **data**, not hardcoded constants.
- Algorithms and serialization tolerate **different holes** per entry inside **`SaveFileV1.maps[]`**.

## Tier populations & unlock gates (stub)

Per-building **estimated population** used for city totals and optimisation objective until real scoring is wired:

| Tier | Stub population | Cumulative city population to **unlock** placing this tier |
|------|-----------------|---------------------------------------------------------------|
| Blue (residential) | 75 | 0 |
| Red (commercial) | 250 | ≥ 250 |
| Green (office) | 800 | ≥ 800 |
| Yellow (luxury) | 2200 | ≥ 2200 |

`estimateCityPopulation` sums stub values over placed buildings. Unlock checks run **before** placing the new building (matches sequential play).

## Placement (orthogonal adjacency)

When **not** using a freedom roof:

- **Blue** — any empty playable cell (no neighbour requirement).
- **Red** — must have an orthogonal neighbour containing **blue**.
- **Green** — orthogonal neighbours must include at least one **blue** and one **red**.
- **Yellow** — orthogonal neighbours must include **blue**, **red**, and **green**.

Neighbours are **4-way** (no diagonals).

## Freedom roofs (non-blue)

For **red / green / yellow**, a **freedom roof** (once unlocked and chosen when placing via `usingFreedomRoof: true`) allows **ignoring adjacency**—build on any empty playable cell. Tokens live in `progression.roofUnlocks` (`freedom-roof-red`, etc.; see `FREEDOM_ROOF_UNLOCK_ID`).

**Blue** roofs (including the **1400 pop trophy**) do **not** change placement rules—blue is already unconstrained by neighbours.

## Progressive building rules (legacy narrative)

The ladder above replaces the earlier informal bullet list; refinements (exact unlock phrasing in UI, demolish interactions) still belong in [`src/rules`](../src/rules/README.md).

Community discussions often note that **rules apply at placement time**, while **demolition/replacement** can produce layouts hard to reach in a single forward-only pass—model **legal transitions** (`place` / `demolish`) in the rules layer, not only static snapshots.

## One save, many boards

One **game save / export** holds **multiple** maps (`SaveFileV1.maps[]`). The UI picks focus; the optimiser can run per board first.
