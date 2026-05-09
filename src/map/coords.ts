/** Canonical string key for a cell (`row,col`) used in grids and sparse maps. */
export function coordKey(row: number, col: number): string {
  return `${row},${col}`
}

export function parseCoordKey(key: string): { row: number; col: number } | null {
  const [r, c] = key.split(',')
  const row = Number(r)
  const col = Number(c)
  if (!Number.isInteger(row) || !Number.isInteger(col)) return null
  return { row, col }
}
