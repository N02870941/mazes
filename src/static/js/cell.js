/**
 * Cell object that represents
 * a cell in the grid that makes
 * up the main canvsas (the maze).
 */
function Cell(i, j) {

  this.i       = i;
  this.j       = j;
  this.optimal = false;
  this.visited = false;
  this.walls   = [
    true,
    true,
    true,
    true
  ];

  /**
   * Selects unvisited adjacent
   * vertices are random for processing
   * in the depth-first search.
   */
  this.checkNeighbors = function() {
    let neighbors = [];

    // Array of portential
    // unvisited adjacenct vertices
    // top, right, bottom left
    let potentials = [

      grid[index(i, j -1)],
      grid[index(i+1, j)],
      grid[index(i, j+1)],
      grid[index(i -1, j)]
    ];

    // Check for each one, if it's not
    // visited, then push onto stack
    potentials.forEach( (p) => {

      if (p && !p.visited)
        neighbors.push(p);

    });

    // There is at least one unvisted
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

  /**
   * Selects unvisited adjacent
   * vertices based on minimum
   * distance for A* algorithm
   */
  this.nextNeighbor = function() {
    let neighbors = [];
    let distances = [];

    let potentials = [

      grid[index(i, j -1)],
      grid[index(i+1, j)],
      grid[index(i, j+1)],
      grid[index(i -1, j)]
    ];

    let p;

    for (let i = 0; i < potentials.length; i++) {

      p = potentials[i]

      if (p && !p.visited) {

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


  /**
   * Computes the euclidian distance
   * between this cell and another point
   * speicifed by it's i and j values.
   */
  this.euclidian = function(cell) {

    let x = abs(cell.j - this.j);
    let y = abs(cell.i - this.i);

    // Pythagorean theorem
    let d = sqrt( sq(x) + sq(y) );

    return d;
  }

  /**
   * Colors the cell a specified color
   */
  this.color = function(r, g, b, a, x, y, l, w) {

    noStroke();

    fill(r, g, b, a);

    rect(x, y, w, w);
  }

  /**
   * Highlights the current node
   * as it is being processed.
   */
  this.highlight = function() {

    this.color(

      255, 0, 0, 255,
      this.i * w,
      this.j * w,
      w, w
    );

  }

  /**
   * Displays the cell in
   * it's initial state.
   */
  this.show = function() {

    let x = this.i * w;
    let y = this.j * w;

    stroke(BLACK);
    strokeWeight(2);

    if (this.walls[0])
      line(x, y , x + w, y);

    if (this.walls[1])
      line(x + w, y  , x + w, y + w);

    if (this.walls[2])
      line(x + w, y + w, x , y + w);

    if (this.walls[3])
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

}

//------------------------------------------------------------------------------

function index(i, j) {

  if (
    i < 0      ||
    j < 0      ||
    i > cols-1 ||
    j > rows-1) {

    return -1;
  }

  return i + j * cols;
}
