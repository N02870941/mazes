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

/**
 * Performs search using the minNeighbor()
 * function for specifying graph traversal
 * order. The minNeighbor function always visits
 * the vertex with the lowest estimated heuristic cost
 * first.
 */
function aStar() {

  return search(minNeighbor)
}

//------------------------------------------------------------------------------

function dijkstra() {

  return search(minNeighbor)
}

//------------------------------------------------------------------------------

/**
 * Performs search using the unvisitedNeighbor()
 * function for specifying graph traversal
 * order. The unvisitedNeighbor function randomly
 * selects an adjacent vertex, resulting in a randomized
 * depth first search.
 */
function DFS() {

  return search(unvisitedNeighbor)
}

//------------------------------------------------------------------------------

/**
 * Takes in a cell and a selector function
 * which has two arguments - neighbors and
 * distances. They are both arrays of the same
 * length where distance[i] represents the distance
 * to get to neighbors[i]. The selector function must
 * return a single value from neighbors. This selector
 * function specifies the order of graph traversal
 */
function next(cell, selector) {

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

  return selector(neighbors, distances)
}

//------------------------------------------------------------------------------

/**
 * Selects unvisited adjacent
 * vertices based on minimum
 * distance for A* algorithm
 */
function minNeighbor(cell) {

  return next(cell, (neighbors, distances) => {

    let min = 0;

    for (let i = 0; i < distances.length; i++)  {

      if (distances[i] < distances[min]) {

        min = i;
      }
    }

    return neighbors[min];

  })
}

//------------------------------------------------------------------------------

function unvisitedNeighbor(cell) {

  return next(cell, (n, distances) => {

    let r = floor(random(0, n.length));

    return n[r];

  })
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
