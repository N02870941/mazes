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
    this.walls   = [
      true,
      true,
      true,
      true
    ];
  }

//------------------------------------------------------------------------------

  /**
   * Returns the Cell's
   * unique key.
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

    let neighbors  = [];

    // All "potential" vertices
    let potentials = this.potentials();

    // Only store truthy neighbors
    potentials.forEach( (c) => {

      if (c) {

        neighbors.push(c);
      }
    })

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

  /**
   * Selects unvisited adjacent
   * vertices are random for processing
   * in the depth-first search.
   */
  checkNeighbors() {

    let neighbors = this.unvisited();

    // There is at least one unvisited
    // adjacent vertex to visit
    if (neighbors.length > 0) {

      // Pick one at random and return it
      let r = floor(random(0, neighbors.length));

      return neighbors[r];

    // Otherwise, there is no
    // more work to do from the
    // current source vertex
    } else {

      return undefined;
    }

  }

//------------------------------------------------------------------------------

  /**
   * Selects unvisited adjacent
   * vertices based on minimum
   * distance for A* algorithm
   */
  next() {
    let neighbors  = [];
    let distances  = [];
    let potentials = this.potentials();
    let p;

    for (let i = 0; i < potentials.length; i++) {

      p = potentials[i];

      if (p && !this.walls[i] && !p.visited) {

        neighbors.push(p);
        distances.push(costs[p.i][p.j]);
      }
    }

    if (neighbors.length > 0) {

      let min = 0;

      for (let i = 0; i < distances.length; i++)  {

        if (distances[i] < distances[min]) {

          min = i;
        }
      }

      return neighbors[min];

    // Otherwise, there is no
    // more work to do from the
    // current source vertex
    } else {

      return undefined;
    }

  }

//------------------------------------------------------------------------------

  /**
   * Returns a boolean value that
   * indicates where not a wall exists
   * between two adjacent vertices.
   */
  wall(cell) {

  }

//------------------------------------------------------------------------------

  /**
   * Colors the cell a specified color
   */
  color(r, g, b, a, x, y, l, w) {

    noStroke();

    fill(r, g, b, a);

    rect(x, y, w, w);
  }

//------------------------------------------------------------------------------

  /**
   * Highlights the current node
   * as it is being processed.
   */
  highlight() {

    this.color(

      255, 0, 0, 100,
      this.i * this.w,
      this.j * this.w,
      this.w,  this.w
    );

  }

//------------------------------------------------------------------------------

  /**
   * Displays the cell in
   * it's initial state.
   */
  show() {

    const w = this.w;
    const x = this.i * w;
    const y = this.j * w;

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

    // Set visited to white
    if (this.visited && !this.optimal) {

      this.color(
        255, 255, 255, 100,
        x, y,
        w, w
      );

    }

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
