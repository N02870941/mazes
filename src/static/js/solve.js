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
    action   = algorithm;
    callback = highlight;

    // Reset the grid
    grid.forEach(c => {

      c.visited = false;

      c.clear();
    });

    // Start at first cell
    current = grid[0];

    // Indicates beginning of path
    parents.set(current.key, null);

    // If we want to do it
    // in the background, execute it,
    // then execute highlight as the
    // callback to highlight the path
    if (!animated()) {

      execute(action, () => {

        solved = true;

        execute(callback, complete);
      });

    // Start draw() loop
    } else {

      loop();
    }

  // In progress
  } else {

    unprepared();
  }

}

//------------------------------------------------------------------------------

/**
 * Searches the maze for the target
 * vertex. This function takes a discover()
 * function that takes a Cell object.
 * discover() returns another Cell that will
 * be the next cell pushed on to the stack.
 */
function search(discover, dequeue) {

  // Mark current node as visited
  current.visited = true;

  // Do not leave visited
  // highlights on screen
  if (!highlighted()) {

    current.clear();
  }

  // We have found the target vertex
  // So, no need to do any more work
  if (Cell.equals(current, target)) {

    return true;
  }

  // Get next vertex according to
  // the specified getter function
  let next = discover(current);

  // Did anything come back?
  if (next) {

    // Mark as visited
    next.visited = true;

    // Is the next vertex alreadty in the path?
    // If not, add it to map for later backtracking
    if (!parents.has(next.key)) {

      parents.set(next.key, current);
    }

    // Push on to stack
    // for backtracking
    stack.push(current);

    // Show on-screen where we are
    current.gradient();
    next.gradient();

    // Move current pointer
    // to next vertex
    current = next;

  // Hit a dead end, begin backtracking
  } else if (stack.length > 0) {

    current = stack.pop();
  }

  // If the stack is empty and no one else to visit, the search is done
  return stack.length === 0 && current.unvisited().length === 0;
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

  // TODO - http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html
  // TODO - http://theory.stanford.edu/~amitp/GameProgramming/index.html

  return search(minNeighbor)
}

//------------------------------------------------------------------------------

/**
 *
 */
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
function next(cell, heuristic, selector) {

  let neighbors  = [];
  let distances  = [];
  let potentials = cell.potentials();
  let cost;

  let add = (x, mask) => {

    if (x && !cell.wall(mask) && !x.visited) {

      cost = heuristic ? heuristic(x, target) : 0;

      neighbors.push(x);
      distances.push(cost);
    }

  };

  add(potentials[TOP],    masks.set.TOP);
  add(potentials[RIGHT],  masks.set.RIGHT);
  add(potentials[BOTTOM], masks.set.BOTTOM);
  add(potentials[LEFT],   masks.set.LEFT);

  return selector(neighbors, distances);
}

//------------------------------------------------------------------------------

/**
 * Selects unvisited adjacent
 * vertices based on minimum
 * distance for A* algorithm
 */
function minNeighbor(cell) {

  return next(
    cell,
    Cell.manhattan,
    (neighbors, distances) => neighbors[minimum(distances)]
  );
}

//------------------------------------------------------------------------------

/**
 * Returns a randomly selected
 * unvisited adjacent vertex.
 */
function unvisitedNeighbor(cell) {

  return next(
    cell,
    null,
    (n, distances) => n[floor(random(0, n.length))]
  );
}

//------------------------------------------------------------------------------

/**
 * Iteratively highlights the solution
 * path going backwards from finish to start
 * using the parents lookup table.
 */
function highlight() {

  let stop = true;

  // Highlight current vertex
  current.shade();

  current = parents.get(current.key);

  // If one came back
  if (current) {

    // Return false to indicate
    // we still have more vertices
    // in our path to highlight
    stop = false;
  }

  return stop;
}
