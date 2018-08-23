/**
 * Solves the maze.
 */
function solve() {

  // Get solver
  let algorithm = trigger.solving();

  // Set solver algorithm
  action = () => showMessage(strings.messages.solve.start);

  // Callbacks
  callbacks = [
    algorithm,
    noGradient,
    () => showMessage(strings.messages.solve.reconstructing),
    maze.highlight,
    trigger.complete,
    () => showMessage(strings.messages.solve.getWalkInfo())
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

    if (!highlighted())
      maze.clean();

    return true;
  }

//------------------------------------------------------------------------------

/**
 * Reset the grid.
 */
function reset(algo) {

  // Reset walk stats
  maze.resetWalk(algo)

  // Reset the grid
  maze.reset()

  // Start at first cell
  current = maze.source();

  // Set the cost to 0
  current.cost = 0;

  // Enqueue to start processing
  queue.push(current);

  // Clear the parents map
  maze.parents.clear();

  // Indicates beginning of path
  maze.parents.set(current.key, null);

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

  return true
}
