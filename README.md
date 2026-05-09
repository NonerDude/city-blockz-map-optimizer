# City Bloxx Map Optimizer

Browser app to help maximize **population** (scoring) in the mobile game **City Bloxx**. You will be able to create, upload, save, import, and export maps, then run a straightforward optimization routine to align building types for higher population counts.

Implementation of map editing, persistence, and the optimizer logic is planned; this repo currently contains only the baseline **Vite + React + TypeScript** setup.

## References & prior discussion

Curated links (wiki, reviews, math threads, solvers) and **takeaways for this repo**: **[`docs/REFERENCES.md`](docs/REFERENCES.md)**.

Short version: the constrained placement puzzle (“blue anywhere, higher tiers need orthogonal neighbors”) appears across **[Tower Bloxx — Gamia Archive](https://gamia-archive.fandom.com/wiki/Tower_Bloxx)** (overview), **[JayIsGames — Tower Bloxx review](https://jayisgames.com/review/tower-bloxx.php)** (Build City vs Quick Game, roofs, long player strategy thread), **[r/math: City Bloxx optimisation](https://www.reddit.com/r/math/comments/4l2nzj/city_bloxx_optimisation/)**, **[Math.SE puzzle](https://math.stackexchange.com/questions/3863517/an-interesting-puzzle-in-an-otherwise-boring-game)**, and **[TowerBlocksOptimizer](https://github.com/kevindalmeijer/TowerBlocksOptimizer)**. Rules differ by **edition**—your mobile **City Bloxx** build remains the authority when they conflict with Flash-era write-ups.

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
