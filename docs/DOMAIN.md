# Domain model (early notes)

Captured from design discussion. This is **not** the full rule spec—especially **roofs**, **demolish**, and exact unlock counts—which will land in [`src/rules`](../src/rules/README.md) as predicates and configurable rule packs once the game behaves clearly.

External write-ups (wiki, reviews, forums) are indexed in **[`REFERENCES.md`](./REFERENCES.md)**; treat them as **hints**, not the canonical spec for your installed game build.

## Board shape

- Typical maps are **`5 × 5` with irregular holes**: the playable footprint is “full grid minus obstacles,” but the **scale might change** slightly; treat width/height and hole set as **data**, not constants in code (`BoardSpec`).
- Algorithms and serialization should tolerate **different bounding boxes** and **different hole masks** across maps in one save.

## Progressive building rules (conceptual)

Rough unlock / adjacency ladder (exact numbers TBD):

1. Only **blue** at start.
2. After the first placement(s), **red** unlocks but may only sit **adjacent to blue**.
3. **Green** expects adjacency (or eligibility) combining **blue and red** conditions.
4. **Yellow** requires presence of **all three** predecessors in the placement neighborhood (as you define neighbor semantics).
5. **Roofs** fall into separate buckets:
   - **Trophy / milestone roofs** (cosmetic gates). Example nailed down: the **first residential (blue) trophy roof** unlocks once total population reaches **≥ 1400**. It **does not** alter placement predicates for blue residences because blues already obey the unrestricted placement policy outlined earlier.
   - **Mechanical roofs** (hypothetical) may later loosen adjacency prerequisites for tiers that genuinely need neighboring anchors—those must be modelled independently with explicit predicates when confirmed.
6. **Demolish** exists; interplay between demolish replay, mechanical roofs, quotas, or re-locking unlocks remains **partially unspecified** → keep rules **data-driven and composable** so we can refactor without rewriting the grid.

Community discussions of **Tower Bloxx / City Bloxx** often emphasize that **tier adjacency rules apply at placement time**, while later **demolition or replacement** can rearrange the city toward layouts that would have been illegal to reach “from scratch” in one pass—our **`rules`** layer should model **legal transitions** (place / demolish / replace), not only static snapshots.

The important engineering goal: **`GameMapState` holds facts** (“what sits where”), while **`rules` answers questions** (“can I place tier X here given progression + demolished history”) and **`algorithm`** searches under those constraints.

## One save, many boards

One **game save / export** aggregates **multiple map instances**, each potentially with a **different hole pattern** or label. Persist as an ordered list (`SaveFileV1.maps[]`). The UI chooses which board is focused; the optimizer can run **per-board** first, whole-save later if cross-map constraints appear.
