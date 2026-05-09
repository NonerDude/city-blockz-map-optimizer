# City Bloxx Map Optimizer

Browser app to help maximize **population** (scoring) in the mobile game **City Bloxx**. You will be able to create, upload, save, import, and export maps, then run a straightforward optimization routine to align building types for higher population counts.

Implementation of map editing, persistence, and the optimizer logic is planned; this repo currently contains only the baseline **Vite + React + TypeScript** setup.

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

Remote: https://github.com/NonerDude/city-bloxx-map-optimizer.git
