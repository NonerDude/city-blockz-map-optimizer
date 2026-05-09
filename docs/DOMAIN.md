# Domain model (early notes)

Captured from design discussion. This is **not** the full rule spec—especially **roofs**, **demolish**, and exact unlock counts—which will land in [`src/rules`](../src/rules/README.md) as predicates and configurable rule packs once the game behaves clearly.

## Board shape

- Typical maps are **`5 × 5` with irregular holes**: the playable footprint is “full grid minus obstacles,” but the **scale might change** slightly; treat width/height and hole set as **data**, not constants in code (`BoardSpec`).
- Algorithms and serialization should tolerate **different bounding boxes** and **different hole masks** across maps in one save.

## Progressive building rules (conceptual)

Rough unlock / adjacency ladder (exact numbers TBD):

1. Only **blue** at start.
2. After the first placement(s), **red** unlocks but may only sit **adjacent to blue**.
3. **Green** expects adjacency (or eligibility) combining **blue and red** conditions.
4. **Yellow** requires presence of **all three** predecessors in the placement neighborhood (as you define neighbor semantics).
5. **Roofs** unlock for earlier colors and loosen placement (e.g. place **some blues anywhere** regardless of neighbors).
6. **Demolish** exists; interplay with roofs, quotas, or re-locking unlocks is **unknown** → keep rules **data-driven and composable** so we can refactor without rewriting the grid.

The important engineering goal: **`GameMapState` holds facts** (“what sits where”), while **`rules` answers questions** (“can I place tier X here given progression + demolished history”) and **`algorithm`** searches under those constraints.

## One save, many boards

One **game save / export** aggregates **multiple map instances**, each potentially with a **different hole pattern** or label. Persist as an ordered list (`SaveFileV1.maps[]`). The UI chooses which board is focused; the optimizer can run **per-board** first, whole-save later if cross-map constraints appear.
