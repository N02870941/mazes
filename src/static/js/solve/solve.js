/**
 * Solves the maze.
 */
function solve() {

  // Get solver
  let algorithm = solving();

  // Set solver algorithm
  action = () => showMessage(strings.messages.solve.start);

  // Callbacks
  callbacks = [
    algorithm,
    noGradient,
    () => showMessage(strings.messages.solve.reconstructing),
    highlight,
    complete,
    () => showMessage({title:'Solved!', content: `${walk.algorithm.name} solved maze in ${walk.length} steps.`})
  ];

  // Initialize solver
  // by specified algorithm
  solverInit(algorithm);

  // Reset grid
  reset(algorithm);

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
function reset(algo) {

  walk.visits    = 0;
  walk.length    = 0;
  walk.algorithm = algo;

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
