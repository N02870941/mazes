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

    // Unique key
    this.key = `${this.i}-${this.j}`;

    // Width of the cell
    this.w = w;

    // Boolean flags to indicate
    // whether or not the cell
    // has been visited and if
    // in the is highlighted on screen
    this.visited     = false;
    this.highlighted = false;

    // Boolean values to
    // indicate whether or
    // not a wall is present
    // for this particular cell.
    // Order: top, right, bottom, left
    this.walls = [
      true,
      true,
      true,
      true
    ];
  }

//------------------------------------------------------------------------------

  /**
   * Returns an array of size 4 of
   * potential adjacent cells. If the
   * computed index is out of bounds (of gird),
   * then undefined is placed for that particular
   * space in the array.
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
   * as visited.
   */
  unvisited() {

    return this.potentials()
               .filter( (c) => c && !c.visited);
  }

//------------------------------------------------------------------------------

  /**
   * Fill the grid square
   * with some color. This will
   * be blended with pixels that
   * are already there.
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
   * Draws the lines that represent
   * the walls of this cell.
   */
  outline(x, y, w) {

    stroke(BLACK);
    strokeWeight(LINE_WIDTH);

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

  /**
   * Colors the cell a specified color
   * and re-draws walls. So they maintain
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

  gradient() {

    // References to first
    // and last vertices in grid
    let first = grid[0];
    let last  = grid[grid.length - 1];

    // Max distance
    let max = Cell.manhattan(first, last);

    // Current distance
    let d = Cell.manhattan(this, last);

    // How much percent are we?
    let ratio = d / max;

    // Get a color that reflects that
    let color = Cell.makeColor(1 - ratio);

    this.color(color);
  }

//------------------------------------------------------------------------------

  /**
   * Highlights the current node
   * as it is being processed.
   */
  highlight() {

    if (!this.highlighted) {

      // this.color(0, 0, 255, 50);

      this.gradient();

      this.highlighted = true;
    }

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

  /**
   * Return hex color from scalar
   * value between 0 and 1.
   */
  static makeColor(val) {

    // https://stackoverflow.com/questions/4161369/html-color-codes-red-to-yellow-to-green

    /**
     * Converts integer to a hexidecimal
     * code, prepad's single
     * digit hex codes with 0 to
     * always return a two digit code.
     */
    let hex = (i) => {

      let hex = parseInt(i).toString(16);

      return (hex.length < 2) ? "0" + hex : hex;
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


}
