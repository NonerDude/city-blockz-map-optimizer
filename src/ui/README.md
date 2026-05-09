# UI (`src/ui`)

React application shell: pages, layout, forms, and any map editor affordances (grid, toolbars, dialogs).

## Responsibilities

- Render the app and handle user interaction.
- Trigger **import** (file input / drag-drop) and **export** (download links); delegate parsing and validation to [`src/map`](../map/README.md).
- Display optimization results from [`src/algorithm`](../algorithm/README.md) without embedding game rules in components.

## Non-responsibilities

- **No** canonical definition of the saved JSON shape (that lives in [`src/map/schema`](../map/schema/README.md)).
- **No** heavy optimization logic (that lives in [`src/algorithm`](../algorithm/README.md)).

## Entry

`App.tsx` is the root component; [`main.tsx`](../main.tsx) mounts it. Add feature folders here as needed (e.g. `components/`, `hooks/`, `routes/`) when you grow beyond a single screen.
