import './App.css'

export default function App() {
  return (
    <div className="app-shell">
      <header className="app-shell__header">
        <h1>City Blockz Map Optimizer</h1>
        <p className="app-shell__lede">
          UI layer scaffold — editor and controls will live in <code>src/ui</code>.
        </p>
      </header>
      <section className="app-shell__doc-hint" aria-label="Project structure">
        <p>
          Map model, serialization, and file schema are in <code>src/map</code> (see{' '}
          <code>src/map/schema</code> for save/load/import/export types). Optimization logic will
          live in <code>src/algorithm</code>.           High-level overview: <code>docs/ARCHITECTURE.md</code>; domain bullets:{' '}
          <code>docs/DOMAIN.md</code>.
        </p>
      </section>
    </div>
  )
}
