/**
 * Solves the maze.
 */
function solve() {

  // Get solver
  let algorithm = trigger.solving();

  // Set solver algorithm
  maze.action = () => showMessage(strings.messages.solve.start);

  // Callbacks
  maze.tasks = [
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

  return false
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
  maze.current = maze.source();

  // Set the cost to 0
  maze.current.cost = 0;

  // Enqueue to start processing
  queue.push(maze.current);

  // Clear the parents map
  maze.parents.clear();

  // Indicates beginning of path
  maze.parents.set(maze.current.key, null);

  return true;
}

//------------------------------------------------------------------------------

/**
 * Initializes the solver.
 */
function solverInit(algorithm) {

  switch (algorithm) {

    case dijkstra.dijkstra:
      dijkstra.init(); break;

    case aStar.aStar:
      aStar.init();    break;

    case dfs.DFS:
      dfs.init();      break;

    case bfs.BFS:
      bfs.init();      break;

    default:
      break;
  }

  return true
}
