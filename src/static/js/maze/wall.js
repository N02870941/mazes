/**
 * A wall is essentially
 * an edge in the graph that
 * connects to cells (vertices).
 */
class Wall {

  /**
   * Constructs a wall object
   * between two adjacent cells.
   */
  construct(u, v) {

    // Type check
    if ( !(u instanceof Cell) || !(v instanceof Cell)) {

      throw new Error('Both arguments must be of type Cell')
    }

    // Compute distances
    let x = abs(u.i - v.i)
    let y = abs(u.j - v.j)

    // Make sure they are adjacent
    if (x === y || x !== 1 || y !== 1) {

      let msg = 'Cells must be adjacent - no diagonals'

      throw new Error(msg)
    }

    this.u = u
    this.v = v
  }

}
