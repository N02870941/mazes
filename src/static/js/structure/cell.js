/**
 * Cell object that represents
 * a cell in the grid that makes
 * up the main canvsas (the maze).
 */
class Cell {

  /**
   * Constructs a new cell at location (i,j) in grid.
   */
  constructor(i, j, w) {

    // Row and column numbers
    this.i = i;
    this.j = j;

    // Default heuristc when
    // finding the shortest path
    this.heuristic = 0;

    // Cost to get to this cell
    // from the start in the search.
    // By default, it is infinite,
    // indicating that there is currently
    // no path to this cell. Upon generating
    // The maze, this value will be updated.
    this.cost = Infinity;

    // Unique key
    this.key = `${this.i}-${this.j}`;

    // Width of the cell
    this.w = w;

    // Boolean flags to indicate
    // whether or not the cell
    // has been visited and if
    // it is highlighted on screen
    this.visited     = false;
    this.highlighted = false;

    // Boolean 'array' to indicate whether or
    // not a wall is present for this particular cell.
    //
    // +-----+-------+--------+------+
    // |  1  |   0   |   1    |  1   |
    // +-----+-------+--------+------+
    // | top | right | bottom | left |
    // +-----+-------+--------+------+
    //
    // The above indicates there is a top, bottom,
    // and left wall, but there is no right wall.
    // To check if there is a right wall, we do:
    //
    // bit  = 1011
    // mask = 0100
    //
    // set = bit & mask
    //
    // set = 0000
    //
    // 0 is falsy, so the right bit is NOT set
    //
    // Note, we use a binary value
    // instead of a traditional array
    // simply for optimization. The cell
    // object has a slightly smaller footprint
    // and lookup may be faster with bitwise
    // operations rather than array lookup (
    // linear search or pointer arithmetic).
    // We use bitwise operations to modify
    // and extract data from this value.
    this.bounds = 0b1111;
  }

//------------------------------------------------------------------------------

  /**
   * Returns an array of size 4 of
   * potential adjacent cells. If the
   * computed index for a particular adjacent vertex
   * is out of bounds (of the grid),
   * then undefined is placed where the reference
   * would have gone.
   *
   * The reason we stored undefined and have a
   * separate method for filtering out falsy
   * neighbors is because in certain methods such
   * as next() in solve.js, we are expecting
   * the top to be in index 0, right in index 1,
   * etc. It is then up to the calling function
   * to ignore / filter out falsy values to avoid errors.
   */
  potentials() {

    return [

      // Top
      grid[Cell.index(this.i,   this.j-1)],

      // Right
      grid[Cell.index(this.i+1, this.j)],

      // Bottom
      grid[Cell.index(this.i,   this.j+1)],

      // Left
      grid[Cell.index(this.i-1, this.j)]
    ];
  }

//------------------------------------------------------------------------------

  /**
   * Returns all adjacent vertices. This
   * essential filters out all undefined /
   * null neighbors returned from potentials().
   * It is worth noting that this function
   * ignores whether or not a neighbor has been visited.
   */
  neighbors() {

    return this.potentials()
               .filter(Boolean);
  }

//------------------------------------------------------------------------------

  /**
   * Returns all unvisited adjacent vertices.
   * This essentially filters ouf all adjacent
   * vertices that have already been marked
   * as visited as well as falsy values (null, undefined).
   */
  unvisited() {

    return this.potentials()
               .filter( (c) => c && !c.visited);
  }

//------------------------------------------------------------------------------

  x() {

    let n = this.potentials();
    let t = [];

    if (n[TOP] && !this.top()) {

      t.push(n[TOP])
    }

    if (n[RIGHT] && !this.right()) {

      t.push(n[RIGHT])
    }

    if (n[BOTTOM] && !this.bottom()) {

      t.push(n[BOTTOM])
    }

    if (n[LEFT] && !this.left()) {

      t.push(n[LEFT])
    }

    return t;
  }

//------------------------------------------------------------------------------

  /**
   * Fill the grid square with some color. This will
   * be blended with pixels that are already there.
   */
  fill(r, g, b, a, x, y, l, w) {

    noStroke();

    if (typeof r === 'string') {

      fill(r);
      rect(g, b, a, x);

    } else {

      fill(r, g, b, a);
      rect(x, y, w, w);
    }
  }

//------------------------------------------------------------------------------

  /**
   * Determines whether or not
   * a wall exists based on the bit
   * mask.
   */
  wall(mask) {

    return (this.bounds & mask) != 0;
  }

//------------------------------------------------------------------------------

  /**
   * Determines whether or not
   * there is a wall above
   * this cell.
   */
  top() {

    return this.wall(masks.set.TOP);
  }

//------------------------------------------------------------------------------

  /**
   * Determines whether or not
   * there is a wall to the right
   * of this cell.
   */
  right() {

    return this.wall(masks.set.RIGHT);
  }

//------------------------------------------------------------------------------

  /**
   * Determines whether or not
   * there is a wall the below
   * this cell.
   */
  bottom() {

    return this.wall(masks.set.BOTTOM);
  }

//------------------------------------------------------------------------------

  /**
   * Determines whether or not
   * there is a wall to the left
   * of this cell.
   */
  left() {

    return this.wall(masks.set.LEFT);
  }

//------------------------------------------------------------------------------

  /**
   * Draws the lines that
   * represent the walls of this cell.
   */
  outline(x, y, w) {

    stroke(BLACK);
    strokeWeight(LINE_WIDTH);

    // There's a top wall
    if (this.top())
      line(x, y , x + w, y);

    // There's a right wall
    if (this.right())
      line(x + w, y  , x + w, y + w);

    // There's a bottom wall
    if (this.bottom())
      line(x + w, y + w, x , y + w);

    // There's a left wall
    if (this.left())
      line(x , y + w, x , y);
  }

//------------------------------------------------------------------------------

  /**
   * Colors the cell a specified color
   * and re-draws walls so they maintain
   * their opacity / darkness.
   */
  color(r, g, b, a) {

    const w = this.w;
    const x = this.i * w;
    const y = this.j * w;

    if (typeof r === 'string') {

      this.fill(r, x, y, w, w);

    } else {

      this.fill(r, g, b, a, x, y, w, w);
    }

    this.outline(x, y, w);
  }

//------------------------------------------------------------------------------

  /**
   *
   */
  shade() {

    this.clear();

    this.color(255, 0, 255, 100);
  }

//------------------------------------------------------------------------------

  /**
   * Highlights the cell with a color
   * from the gradient from red to green
   * depending on the distance between
   * this cell and the target vertex (in search).
   *
   * Distance is either euclidian or manhattan. This
   * is based on the heuristic used at runtime (specific
   * to A*). If no heuristic is being used (Dijkstra, DFS,
   * or BFS), then euclidian distance is used.
   */
  gradient(src, dst, heuristic) {

    // Do not re-highlight
    if (this.highlighted) {

        return;
    }

    // If no heuristic,
    // use Euclidian for
    // gradient color map
    if (!heuristic) {

      heuristic = Cell.euclidian;
    }

    // Max and current distances
    let m = heuristic(source, target);
    let d = heuristic(this, target);

    // How much percent are we
    // of the max distance?
    let ratio = d / m;

    // Get a color that reflects
    let color = Cell.makeColor(ratio);

    // Color in this cell
    this.color(color);

    // Mark it as highlighted
    this.highlighted = true;
  }

//------------------------------------------------------------------------------

  /**
   * Highlights the current node
   * as it is being processed.
   */
  highlight() {

    if (this.highlighted) {

      return;
    }

    this.color(0, 0, 255, 50);

    this.highlighted = true;
  }

//------------------------------------------------------------------------------

  /**
   * Clears any coloring and
   * resets cell color to white.
   */
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

    const a = dst.j - src.j;
    const b = dst.i - src.i;

    return sqrt( sq(a) + sq(b) );
  }

//------------------------------------------------------------------------------

  /**
   * Computes the manhattan distance
   * between this cell and another cell.
   */
  static manhattan(src, dst) {

    const a = abs(dst.j - src.j);
    const b = abs(dst.i - src.i);

    return a + b
  }

//------------------------------------------------------------------------------

  /**
   * Returns the index of cell
   * in the 1D grid provided it's
   * 2D coordinates.
   */
  static index(i, j) {

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

  /**
   * Removes the wall between two adjacent
   * vertices to create a path between them.
   */
  static pave(u, v) {

    // Vertical and horizontal
    // distances between two cells
    const x = u.i - v.i;
    const y = u.j - v.j;

    // They are next to each other
    if (x === 1) {

      u.bounds &= masks.unset.LEFT;
      v.bounds &= masks.unset.RIGHT;

    } else if (x === -1) {

      u.bounds &= masks.unset.RIGHT;
      v.bounds &= masks.unset.LEFT;
    }

    // They are on top of each other
    if (y === 1) {

      u.bounds &= masks.unset.TOP;
      v.bounds &= masks.unset.BOTTOM;

    } else if (y === -1) {

      u.bounds &= masks.unset.BOTTOM;
      v.bounds &= masks.unset.TOP;
    }

  }

//------------------------------------------------------------------------------

  /**
   * Return hex color from scalar
   * value between 0 and 1.
   */
  static makeColor(val) {

    // This algorithm goes from green
    // to red, but we want red to green,
    // so we reverse it by subtracting
    // value from 1, and setting that to val.
    val = 1 - val;

    // https://stackoverflow.com/questions/4161369/html-color-codes-red-to-yellow-to-green

    /**
     * Converts integer to a hexidecimal
     * code, prepad's single
     * digit hex codes with 0 to
     * always return a two digit code.
     */
    let hex = (i) => {

      let h = parseInt(i).toString(16);

      return h.length < 2 ? "0" + h : h;
    }

    // value must be between [0, 510]
    val = min(max(0, val), 1) * 510;

    let red;
    let gre;

    if (val < 255) {

        red = 255;
        gre = sqrt(val) * 16;
        gre = round(gre);

    } else {

      gre = 255;
      val = val - 255;
      red = 255 - (sq(val) / 255);
      red = round(red);
    }

    return "#" + hex(red) + hex(gre) + "00";
  }

//------------------------------------------------------------------------------

  /**
   * Checks equality between two
   * cells based on their coordinates.
   */
  static equals(u, v) {

    return u.i === v.i &&
           u.j === v.j;
  }

//------------------------------------------------------------------------------

  /**
   * Returns random unvisited
   * adjacent vertex.
   */
  static randomNeighbor(cell) {

    // Get unvisited neighbors
    let neighbors = cell.unvisited();

    // Random index
    let r = floor(random(0, neighbors.length));

    // Return random neighbor
    return neighbors[r];
  }
}
