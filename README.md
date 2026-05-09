# City Blockz Map Optimizer

Browser app to help maximize **population** (scoring) in the mobile game **City Blockz**. You will be able to create, upload, save, import, and export maps, then run a straightforward optimization routine to align building types for higher population counts.

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

Source is grouped into **UI**, **map** (including file **schema** for save/load/import/export), and **algorithm**:

| Path | Role |
|------|------|
| `src/ui/` | React app shell and future editor |
| `src/map/` | `GameMapState`, serialization, and `schema/` for versioned files |
| `src/algorithm/` | Population / layout optimization logic |

Overview diagram and boundaries: **[`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)**. Each folder includes a **`README.md`** describing that layer.

## Repository

Remote: https://github.com/NonerDude/city-blockz-map-optimizer.git
