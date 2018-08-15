/**
 * Generates the maze.
 */
function generate() {

  // Are we still generating?
  if (generator(action) && !generated) {

    notify(strings.WAIT_FOR_MAZE);

  // Cancel whatever we are doing
  // and start generating a new maze
  } else {

    // Fire generating event
    let algorithm = generating();

    // Change main event loop
    // action to specified algorithm
    action = algorithm;

    init();
  }

}

//------------------------------------------------------------------------------

function make(getter, bfs) {

  // Mark as visited
  current.visited = true;

  // Set back to white
  current.clear();

  // Get random neighbor
  let next = getter(current);

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

    current = bfs ? stack.shift() : stack.pop();
  }

  // Indicated where or not
  // all nodes have been processed.
  return stack.length === 0;
}

//------------------------------------------------------------------------------

/**
 * Modified depth-first search that
 * continuously removes boundaries
 * between adjacent cells to create
 * one continuous path.
 */
function dfs() {

  return make(randomNeighbor);
}

//------------------------------------------------------------------------------

/**
 * Randomizes Prim's algorithm
 */
function bfs() {

  return make(randomNeighbor, true);
}

//------------------------------------------------------------------------------

/**
 * Selects unvisited adjacent
 * vertices are random for processing
 * in the depth-first search.
 */
function randomNeighbor(cell) {

  // Get unvisited neighbors
  let neighbors = cell.unvisited();

  // Random index
  let r = floor(random(0, neighbors.length));

  // Return random neighbor
  return neighbors[r];
}

//------------------------------------------------------------------------------

function closestNeighbor(cell) {

  let neighbors = cell.unvisited();

  return neighbors[0];
}
