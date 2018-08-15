/**
 * Solves the maze.
 */
function solve() {

  let algorithm = solving();

  // Maze fully generated?
  if (generated) {

    // Change main event loop's
    // primary action to specified
    // search algorithm
    action = algorithm;

    // Reset
    grid.forEach(c => {

      c.visited = false

      c.clear()
    });

    // Start at first cell
    current = grid[0];

    parents[current.key()] = null;

    loop();

  // In progress
  } else {

    unprepared();
  }

}

//------------------------------------------------------------------------------

function search(getter, show) {

  current.visited = true;

  // Do not leave visited
  // highlights on screen
  if (!showHighlights()) {

    current.clear();
  }

  // We have found the target vertex
  // So, no need to do any more work
  if (costs[current.i][current.j] === 0) {

    return true;
  }

  // Get next vertex according to
  // the specified getter function
  let next = getter(current);

  if (next) {

    // Mark as visited
    next.visited = true;

    // Is the next vertex alreadty in the path?
    // If not, add it to map for later backtracking
    if (parents[next.key()] === undefined) {

      parents[next.key()] = current.key();
    }

    // Push on to stack
    // for backtracking
    stack.push(current);

    // Show on-screen where we are
    current.highlight()
    next.highlight()

    // Move current pointer
    // to next vertex
    current = next;

  // Hit a dead end, begin backtracking
  } else if (stack.length > 0) {

    current = stack.pop();
  }

  // If true, search complete
  return stack.length === 0;
}

//------------------------------------------------------------------------------

function aStar() {

  return search(minNeighbor)
}

//------------------------------------------------------------------------------

function dijkstra() {

  return search(minNeighbor)
}

//------------------------------------------------------------------------------

function DFS() {

  return search(unvisitedNeighbor)
}

//------------------------------------------------------------------------------

/**
 * Selects unvisited adjacent
 * vertices based on minimum
 * distance for A* algorithm
 */
function minNeighbor(cell) {
  let neighbors  = [];
  let distances  = [];
  let potentials = cell.potentials();
  let p;

  for (let i = 0; i < potentials.length; i++) {

    p = potentials[i];

    if (p && !cell.walls[i] && !p.visited) {

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

function unvisitedNeighbor(cell) {

  let neighbors  = [];
  let distances  = [];
  let potentials = cell.potentials();
  let p;

  for (let i = 0; i < potentials.length; i++) {

    p = potentials[i];

    if (p && !cell.walls[i] && !p.visited) {

      neighbors.push(p);
      distances.push(costs[p.i][p.j]);
    }
  }

  if (neighbors.length > 0) {

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

function highlight() {

  if (!current) {

    return true;
  }

  current.shade();

  let s = parents[current.key()];

  if (s) {

    let a = s.split('-');
    let i = parseInt(a[0]);
    let j = parseInt(a[1]);

    let parent = grid[current.index(i, j)];

    current = parent;

    return false;
  }

  return true;
}
