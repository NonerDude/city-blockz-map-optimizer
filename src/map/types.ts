/**
 * In-memory map used by the editor and optimizer.
 * Replace placeholder fields with cells, zoning, adjacency caches, etc.
 */
export interface GameMapState {
  readonly width: number
  readonly height: number
  revision: number
}
