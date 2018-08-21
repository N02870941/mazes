/**
 * Solves the maze.
 */
function solve() {

  // Get solver
  let algorithm = solving();

  // Set algorithm and callbacks
  action    = algorithm;
  callbacks = [noGradient, highlight, complete];

  // Initialize solver
  // by specified algorithm
  solverInit(algorithm);

  // Reset grid
  reset();

  // Start the process
  start();
}

//------------------------------------------------------------------------------

  /**
   * Clears the gradient if
   * the checkbox is unchecked.
   */
  function noGradient() {

    if (!highlighted()) {

      clean();
    }

    return true;
  }

//------------------------------------------------------------------------------

/**
 * Reset the grid.
 */
function reset() {

  // Reset the grid
  grid.forEach(c => {

    c.cost    = Infinity;
    c.visited = false;
    c.clear();
  });

  // Start at first cell
  current = source;

  // Set the cost to 0
  current.cost = 0;

  // Enqueue to start processing
  queue.push(current);

  // Clear the parents map
  parents.clear();

  // Indicates beginning of path
  parents.set(current.key, null);

  return true;
}

//------------------------------------------------------------------------------

/**
 * Initializes the solver.
 */
function solverInit(algorithm) {

  switch (algorithm) {

    case dijkstra:
      initDijkstra(); break;

    case aStar:
      initAStar();    break;

    case DFS:
      initDFS();      break;

    case BFS:
      initBFS();      break;

    default:
      break;
  }
}
