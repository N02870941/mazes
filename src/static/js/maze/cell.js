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

    // Default heuristic when
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
    // object has a slightly smaller memory footprint
    // and lookup may be faster with bitwise
    // operations rather than array lookup (
    // linear search or pointer arithmetic).
    // We use bitwise operations to modify
    // and extract data from this binary value.
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

      // Top, right, bottom, left
      maze.get(this.i,   this.j-1),
      maze.get(this.i+1, this.j),
      maze.get(this.i,   this.j+1),
      maze.get(this.i-1, this.j),
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
   * Returns specific neighbors
   * by array of indices
   */
  specificNeighbors(...indices) {

    let potentials = this.potentials()
    let neighbors  = []

    indices.forEach(i => {

      if (potentials[i])
        neighbors.push(potentials[i])
    })

    return neighbors
  }

//------------------------------------------------------------------------------

  /**
   * Returns references to top
   * and bottom adjacent cells.
   */
  verticalNeighbors() {

    return this.specificNeighbors(
      Cell.indices.TOP,
      Cell.indices.BOTTOM
    )
  }

//------------------------------------------------------------------------------

  /**
   * Returns references to left
   * and right adjacent cells.
   */
  horizontalNeighbors() {

    return this.specificNeighbors(
      Cell.indices.LEFT,
      Cell.indices.RIGHT
    )
  }

//------------------------------------------------------------------------------

  /**
   * Returns all unvisited adjacent vertices.
   * This essentially filters ouf all adjacent
   * vertices that have already been marked
   * as visited as well as falsy values (null, undefined).
   */
  unvisited() {

    return this.potentials().filter( (c) => c && !c.visited)
  }

//------------------------------------------------------------------------------

  /**
   * Returns references to all adjacent
   * vertices for which there exists no
   * wall.
   */
  x() {

    let n = this.potentials();
    let t = [];

    if (n[Cell.indices.TOP] && !this.top())
      t.push(n[Cell.indices.TOP])

    if (n[Cell.indices.RIGHT] && !this.right())
      t.push(n[Cell.indices.RIGHT])

    if (n[Cell.indices.BOTTOM] && !this.bottom())
      t.push(n[Cell.indices.BOTTOM])

    if (n[Cell.indices.LEFT] && !this.left())
      t.push(n[Cell.indices.LEFT])

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

    return this.wall(Cell.masks.set.TOP);
  }

//------------------------------------------------------------------------------

  /**
   * Determines whether or not
   * there is a wall to the right
   * of this cell.
   */
  right() {

    return this.wall(Cell.masks.set.RIGHT);
  }

//------------------------------------------------------------------------------

  /**
   * Determines whether or not
   * there is a wall the below
   * this cell.
   */
  bottom() {

    return this.wall(Cell.masks.set.BOTTOM);
  }

//------------------------------------------------------------------------------

  /**
   * Determines whether or not
   * there is a wall to the left
   * of this cell.
   */
  left() {

    return this.wall(Cell.masks.set.LEFT);
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
   * Shades a cell in pink
   * to highlight it. This is
   * used to highlight a path
   * or given walk of the maze.
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
  gradient() {

    // Do not re-highlight
    if (this.highlighted) {

        return;
    }

    // Max and current distances
    let m = Cell.heuristics.euclidian(maze.source(), maze.target());
    let d = Cell.heuristics.euclidian(this, maze.target());

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

      return
    }

    this.color(0, 0, 255, 50)

    this.highlighted = true
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

/**
 * Define readonly psuedo-static
 * attributes called heuristics.
 * https://stackoverflow.com/questions/32647215/declaring-static-constants-in-es6-classes
 */
Object.defineProperty(Cell, 'heuristics', {

  value : {

    // Euclidian distance
    euclidian : (src, dst) => {

      const a = dst.j - src.j;
      const b = dst.i - src.i;

      return sqrt( sq(a) + sq(b) );
    },

//------------------------------------------------------------------------------

    // Manhattan distance
    manhattan : (src, dst) => {

      const a = abs(dst.j - src.j);
      const b = abs(dst.i - src.i);

      return a + b
    },

//------------------------------------------------------------------------------

    // Cross product helps break ties
    crossProduct : function (src, dst) {

      let determinant = (matrix) => {

        let a = matrix[0][0]
        let b = matrix[1][0]
        let c = matrix[0][1]
        let d = matrix[1][1]

        return (a * d) - (b * c)
      }

      // http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html#breaking-ties

      // Manhattan distance from here to target
      let heuristic = abs(dst.j - src.j) +
                      abs(dst.i - src.i)

      // Get max path length in the current maze
      let max = abs(maze.target().j - maze.source().j) +
                abs(maze.target().i - maze.source().i)


      // Compute Determinant
      let dx1 = src.j - dst.j
      let dy1 = src.i - dst.i

      let dx2 = maze.source().j - maze.target().j
      let dy2 = maze.source().i - maze.target().i

      // Determinant
      let matrix = [
        [dx1, dy1],
        [dx2, dy2]
      ]

      // Compute the determinant
      let det = determinant(matrix)

      // Get absolute value, then square root
      // to preserve the units of the heuristic
      let weight = sqrt( abs(det) )

      // Scale factor p should not exceed:
      // min(step cost) / max(# steps)
      let scale = 1 / max

      // Add to heuristic
      heuristic = (scale * weight) + heuristic

      return heuristic
    },

  //------------------------------------------------------------------------------

    comparators : {

      standard      : (a, b) => a.heuristic + a.cost < b.heuristic + b.cost,
      pureHeuristic : (a, b) => a.heuristic < b.heuristic,
      pureCost      : (a, b) => a.cost < b.cost
    }

  },

  writable     : false,
  enumerable   : false,
  configurable : false
});

//------------------------------------------------------------------------------

/**
 * Bitmasks for walls.
 */
Object.defineProperty(Cell, 'masks', {

  value : {

    set : {

      TOP    : 0b1000,
      RIGHT  : 0b0100,
      BOTTOM : 0b0010,
      LEFT   : 0b0001
    },

    unset : {

      TOP    : 0b0111,
      RIGHT  : 0b1011,
      BOTTOM : 0b1101,
      LEFT   : 0b1110
    }

  },

  writable     : false,
  enumerable   : false,
  configurable : false
});

//------------------------------------------------------------------------------

/**
 * Array indices for
 * adjacent neighors.
 */
Object.defineProperty(Cell, 'indices', {

  value : {

    TOP    : 0,
    RIGHT  : 1,
    BOTTOM : 2,
    LEFT   : 3
  },

  writable     : false,
  enumerable   : false,
  configurable : false
});
