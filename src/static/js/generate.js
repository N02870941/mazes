/**
 * Generates the maze.
 */
function generate() {

  console.log('generating');
}

//------------------------------------------------------------------------------

/**
 * Removes the wall between two adjacent
 * vertices to create a path between them.
 */
function removeWalls(u, v) {

  // Left, right, top, bottom
  const T = 0;
  const B = 1;
  const R = 2;
  const L = 3;

  // Vertical and horizontal distances
  const x = u.i - v.i;
  const y = u.j - v.j;

  if (x === 1) {

    u.walls[3] = false;
    v.walls[1] = false;

  } else if (x === -1) {

    u.walls[1] = false;
    v.walls[3] = false;
  }

  if (y === 1) {

    u.walls[0] = false;
    v.walls[2] = false;

  } else if (y === -1) {

    u.walls[2] = false;
    v.walls[0] = false;
  }

}
