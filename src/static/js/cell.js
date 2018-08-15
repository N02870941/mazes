/**
 * Cell object that represents
 * a cell in the grid that makes
 * up the main canvsas (the maze).
 */
class Cell {

  /**
   * Constructs a new cell
   * at location (i,j)
   */
  constructor(i, j, w) {

    this.i       = i;
    this.j       = j;
    this.w       = w;
    this.optimal = false;
    this.visited = false;
    this.highlighted = false;
    this.walls   = [
      true,
      true,
      true,
      true
    ];
  }

//------------------------------------------------------------------------------

  /**
   * Returns the Cell's unique key.
   */
  key() {

    return `${this.i}-${this.j}`;
  }

//------------------------------------------------------------------------------

  /**
   * Returns the index of cell
   * in the 1D grid provided it's
   * 2D coordinates.
   */
  index(i, j) {

    if (
      i < 0      ||
      j < 0      ||
      i > cols-1 ||
      j > rows-1) {

      return -1;
    }

    return i + j * cols;
  }

//------------------------------------------------------------------------------

  potentials() {

    return [

      // Top
      grid[this.index(this.i,   this.j-1)],

      // Right
      grid[this.index(this.i+1, this.j)],

      // Bottom
      grid[this.index(this.i,   this.j+1)],

      // Left
      grid[this.index(this.i-1, this.j)]
    ];
  }

//------------------------------------------------------------------------------

  /**
   * Returns adjacent vertices.
   */
  neighbors() {

    let neighbors = [];

    // All "potential" vertices
    let potentials = this.potentials();

    // Only store truthy neighbors
    potentials.forEach( (c) => {

      if (c) {

        neighbors.push(c);
      }
    });

    return neighbors;
  }

//------------------------------------------------------------------------------

  /**
   * Returns all unvisited adjacent vertices.
   */
  unvisited() {

    let unvisited = [];
    let neighbors = this.neighbors();

    neighbors.forEach( (c) => {

      if (c && !c.visited) {

        unvisited.push(c);
      }

    });

    return unvisited;
  }

//------------------------------------------------------------------------------

  fill(r, g, b, a, x, y, l, w) {

    noStroke();

    fill(r, g, b, a);

    rect(x, y, w, w);
  }

//------------------------------------------------------------------------------

  /**
   * Colors the cell a specified color
   */
  color(r, g, b, a) {

    const w = this.w;
    const x = this.i * w;
    const y = this.j * w;

    this.fill(
      r, g, b, a,
      x, y,
      w, w
    )

    stroke(BLACK);
    strokeWeight(2);

    if (this.walls[TOP])
      line(x, y , x + w, y);

    if (this.walls[RIGHT])
      line(x + w, y  , x + w, y + w);

    if (this.walls[BOTTOM])
      line(x + w, y + w, x , y + w);

    if (this.walls[LEFT])
      line(x , y + w, x , y);
  }

//------------------------------------------------------------------------------

  shade() {

    this.clear();

    this.color(255, 0, 255, 100);
  }

//------------------------------------------------------------------------------

  /**
   * Highlights the current node
   * as it is being processed.
   */
  highlight() {

    if (!this.highlighted) {

      this.color(0, 0, 255, 50);

      this.highlighted = true;
    }


  }

//------------------------------------------------------------------------------

  clear() {

    this.color(255, 255, 255, 255);

    this.highlighted = false;
  }

//------------------------------------------------------------------------------

  /**
   * Computes the euclidian distance
   * between this cell and another cell
   * usig the Pythagorean Theorem.
   */
  static euclidian(src, dst) {

    const a = abs(dst.j - src.j);
    const b = abs(dst.i - src.i);

    return sqrt( sq(a) + sq(b) );
  }

//------------------------------------------------------------------------------

  /**
   * Removes the wall between two adjacent
   * vertices to create a path between them.
   */
  static pave(u, v) {

    // Vertical and horizontal distances
    const x = u.i - v.i;
    const y = u.j - v.j;

    if (x === 1) {

      u.walls[LEFT]  = false;
      v.walls[RIGHT] = false;

    } else if (x === -1) {

      u.walls[RIGHT] = false;
      v.walls[LEFT]  = false;
    }

    if (y === 1) {

      u.walls[TOP]    = false;
      v.walls[BOTTOM] = false;

    } else if (y === -1) {

      u.walls[BOTTOM] = false;
      v.walls[TOP]    = false;
    }

  }

}
