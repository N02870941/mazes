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

  solverInit(algorithm);
  reset(algorithm);
  start();

  return false
}

//------------------------------------------------------------------------------

  /**
   * Clears the gradient if the checkbox is unchecked.
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
  maze.resetWalk(algo)
  maze.reset()
  maze.current = maze.source();
  maze.current.cost = 0;
  queue.push(maze.current);
  maze.parents.clear();
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
      aStar.init(); break;

    case dfs.DFS:
      dfs.init(); break;

    case bfs.BFS:
      bfs.init(); break;

    default:
      break;
  }

  return true
}
