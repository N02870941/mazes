/**
 * Generates the maze.
 */
function generate() {

  // Reset the grid
  if (generated) {

    init();
  }

  loop();
}

//------------------------------------------------------------------------------

function dfs() {

  for (let i = 0; i < grid.length; i++) {

    grid[i].show();
  }

  current.visited = true;

  current.highlight();

  let next = current.checkNeighbors();

  if (next) {

    next.visited = true;

    stack.push(current);

    removeWalls(current, next);

    current = next;

  } else if (stack.length > 0) {

    current = stack.pop();
  }

  return stack.length == 0;

}

//------------------------------------------------------------------------------

/**
 * Removes the wall between two adjacent
 * vertices to create a path between them.
 */
function removeWalls(u, v) {

  // Left, right, top, bottom
  const T = 0;
  const B = 3;
  const R = 1;
  const L = 2;

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
