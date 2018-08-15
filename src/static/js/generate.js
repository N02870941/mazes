/**
 * Generates the maze.
 */
function generate() {

  // Are we generating?
  if (!action || generator(action)) {

    // Done generating? Start over
    if (generated || !action) {

      // Fire generating event
      let algorithm = generating();

      // Change main event loop
      // action to specified algorithm
      action = algorithm;

      init();

    // In progress
    } else {

      notify(strings.WAIT_FOR_MAZE);
    }
  }
}

//------------------------------------------------------------------------------

/**
 * Modified depth-first search that
 * continuously removes boundaries
 * between adjacent cells to create
 * one continuous path.
 */
function dfs() {

  // Mark as visited
  current.visited = true;

  // Set back to white
  current.clear();

  // Get random neighbor
  let next = randomNeighbor(current);

  // Did one come back?
  if (next) {

    // Mark as visited
    next.visited = true;

    // Push current onto stack
    // for backtracking purposes
    stack.push(current);

    // Remove the wall between
    // these two adjacent vertices
    Cell.pave(current, next);

    // Show in white
    current.clear();
    next.clear();

    // Highlight end of path
    current.highlight();

    // Shift the pointers
    current = next;

  // We have reached maximum depth
  // so we start back tracking
  } else if (stack.length > 0) {

    current = stack.pop();
  }

  // Indicated where or not
  // all nodes have been processed.
  return stack.length === 0;
}

//------------------------------------------------------------------------------

function prim() {

  // Mark as visited
  current.visited = true;

  // Set back to white
  current.clear();

  // Get random neighbor
  let next = randomNeighbor(current);

  // Did one come back?
  if (next) {

    // Mark as visited
    next.visited = true;

    // Push current onto stack
    // for backtracking purposes
    stack.push(current);

    // Remove the wall between
    // these two adjacent vertices
    Cell.pave(current, next);

    // Show in white
    current.clear();
    next.clear();

    // Highlight end of path
    current.highlight();

    // Shift the pointers
    current = next;

  // We have reached maximum depth
  // so we start back tracking
  } else if (stack.length > 0) {

    current = stack.pop();
  }

  // Indicated where or not
  // all nodes have been processed.
  return stack.length === 0;
}

//------------------------------------------------------------------------------

/**
 * Selects unvisited adjacent
 * vertices are random for processing
 * in the depth-first search.
 */
function randomNeighbor(cell) {

  let neighbors = cell.unvisited();

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
