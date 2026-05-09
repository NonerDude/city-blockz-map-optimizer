import { describe, it, expect } from 'vitest'
import { coordKey } from '../map/coords'
import { createDemoFiveByFive, createEmptyGameMapState } from '../map/factory'
import type { GameMapState } from '../map/types'
import type { PlacedBuilding } from '../map/cell'
import { evaluatePlacement } from './placement'
import { FREEDOM_ROOF_UNLOCK_ID } from './tierConstants'

function mergeCells(
  base: GameMapState,
  cells: Record<string, PlacedBuilding | undefined>,
): GameMapState {
  return {
    ...base,
    revision: base.revision + 1,
    cells: { ...base.cells, ...cells },
  }
}

describe('evaluatePlacement', () => {
  it('allows blue on an empty playable cell', () => {
    expect(evaluatePlacement(createDemoFiveByFive(), 'blue', 0, 0).allowed).toBe(true)
  })

  it('rejects placement on a hole', () => {
    const m = createEmptyGameMapState({
      width: 5,
      height: 5,
      holes: [[0, 0]],
    })
    expect(evaluatePlacement(m, 'blue', 0, 0).allowed).toBe(false)
  })

  it('locks red until estimated city population reaches 250', () => {
    const r = evaluatePlacement(createDemoFiveByFive(), 'red', 0, 0)
    expect(r.allowed).toBe(false)
    expect(r.detail).toMatch(/250/)
  })

  it('allows red next to blue when population gate is met', () => {
    const fourBlues = mergeCells(createDemoFiveByFive(), {
      [coordKey(0, 0)]: { tier: 'blue' },
      [coordKey(0, 1)]: { tier: 'blue' },
      [coordKey(0, 2)]: { tier: 'blue' },
      [coordKey(0, 3)]: { tier: 'blue' },
    })
    expect(evaluatePlacement(fourBlues, 'red', 1, 0).allowed).toBe(true)
  })

  it('allows green when unlocked and orthogonally adjacent to blue and red', () => {
    const cells: Record<string, PlacedBuilding> = {}
    for (let c = 0; c < 5; c++) cells[coordKey(0, c)] = { tier: 'blue' }
    for (let c = 0; c < 5; c++) cells[coordKey(1, c)] = { tier: 'blue' }
    cells[coordKey(2, 0)] = { tier: 'blue' }
    let m = mergeCells(createDemoFiveByFive(), cells)
    m = mergeCells(m, { [coordKey(3, 0)]: { tier: 'red' } })
    m = mergeCells(m, { [coordKey(4, 1)]: { tier: 'blue' } })
    expect(evaluatePlacement(m, 'green', 4, 0).allowed).toBe(true)
  })

  it('allows red on the far corner when freedom roof is active and unlocked', () => {
    const fourBlues = mergeCells(createDemoFiveByFive(), {
      [coordKey(0, 0)]: { tier: 'blue' },
      [coordKey(0, 1)]: { tier: 'blue' },
      [coordKey(0, 2)]: { tier: 'blue' },
      [coordKey(0, 3)]: { tier: 'blue' },
    })
    const m: GameMapState = {
      ...fourBlues,
      progression: {
        roofUnlocks: [FREEDOM_ROOF_UNLOCK_ID.red],
        meta: {},
      },
    }
    expect(evaluatePlacement(m, 'red', 4, 4, { usingFreedomRoof: true }).allowed).toBe(true)
  })
})
