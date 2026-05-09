# City Bloxx Map Optimizer

Browser app to help maximize **population** (scoring) in the mobile game **City Bloxx**. You will be able to create, upload, save, import, and export maps, then run a straightforward optimization routine to align building types for higher population counts.

Implementation of map editing, persistence, and the optimizer logic is planned; this repo currently contains only the baseline **Vite + React + TypeScript** setup.

## Prior discussion

The constrained placement puzzle (“blue anywhere, higher tiers need orthogonal neighbors”) has been discussed elsewhere for years—for example **[r/math: City Bloxx optimisation](https://www.reddit.com/r/math/comments/4l2nzj/city_bloxx_optimisation/)** (2016). That thread overlaps the same optimisation question this app targets; implementations and proof ideas there are independent of this codebase.

Related angles people often cite: constraint programming / search on small grids ([TowerBlocksOptimizer](https://github.com/kevindalmeijer/TowerBlocksOptimizer)), and puzzles framed as **[City Bloxx on Math StackExchange](https://math.stackexchange.com/questions/3863517/an-interesting-puzzle-in-an-otherwise-boring-game)**. Use them as optional reading alongside your phone build rules (**roofs**, **demolish**, **holes** vary by game/edition).

## Stack

- [Vite](https://vite.dev/) — dev server and build
- [React](https://react.dev/) — UI

## Prerequisites

- [Node.js](https://nodejs.org/) (current LTS recommended)

## Scripts

```bash
npm install    # dependencies (already run once after clone)
npm run dev    # local dev server
npm run build  # production build to dist/
npm run preview # serve the production build locally
npm run lint   # ESLint
```

## Project layout

Source is grouped into **UI**, **map** (boards + **`schema`** for files), **`rules`** (placement/progression predicates), and **algorithm**:

| Path | Role |
|------|------|
| `src/ui/` | React app shell and future editor |
| `src/map/` | `BoardSpec`, `GameMapState`, serializers (`MapFileV1` / `SaveFileV1`) |
| `src/rules/` | Placement legality, roofs, unlock scaffolding |
| `src/algorithm/` | Search / scoring under rule constraints |

Narrative domain notes (**holes, tiers, roofs, saves with many boards**): **[`docs/DOMAIN.md`](docs/DOMAIN.md)** — diagram + boundaries **[`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)**. Each featured folder ships a **`README.md`** explaining its responsibilities.

## Repository

Target Git hosting URL: https://github.com/NonerDude/city-bloxx-map-optimizer.git  

Cloning or keeping the workspace folder aligned with GitHub slug: **`city-bloxx-map-optimizer`** (rename locally if yours still says `city-blockz-optimizer`).

Until the GitHub repository is renamed from `city-blockz-map-optimizer` to `city-bloxx-map-optimizer` (repository **Settings → General**), pushes may keep using that old slug; afterward run:

```bash
git remote set-url origin https://github.com/NonerDude/city-bloxx-map-optimizer.git
```
