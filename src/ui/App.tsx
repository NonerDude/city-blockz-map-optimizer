import './App.css'
import { createDemoFiveByFive } from '../map/factory'
import { estimateCityPopulation } from '../rules/population'
import {
  ESTIMATED_POPULATION_BY_TIER,
  UNLOCK_MIN_CITY_POPULATION,
} from '../rules/tierConstants'

export default function App() {
  const emptyEst = estimateCityPopulation(createDemoFiveByFive())

  return (
    <div className="app-shell">
      <header className="app-shell__header">
        <h1>City Bloxx Map Optimizer</h1>
        <p className="app-shell__lede">
          UI layer — editor and controls will live in <code>src/ui</code>. Rules stub is active in{' '}
          <code>src/rules</code> (placement, unlocks, freedom roofs).
        </p>
      </header>
      <section className="app-shell__doc-hint" aria-label="Project structure">
        <p>
          Map model and serializers: <code>src/map</code>. Optimisation entry: <code>src/algorithm</code>.
          Docs: <code>docs/ARCHITECTURE.md</code>, <code>docs/DOMAIN.md</code>.
        </p>
        <p className="app-shell__stub">
          Stub tier populations {JSON.stringify(ESTIMATED_POPULATION_BY_TIER)} · unlock cumulative
          totals {JSON.stringify(UNLOCK_MIN_CITY_POPULATION)} · empty 5×5 estimated population:{' '}
          <strong>{emptyEst}</strong>.
        </p>
      </section>
    </div>
  )
}
