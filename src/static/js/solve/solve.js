/**
 * Solves the maze.
 */
function solve() {

  // Get solver
  let algorithm = solving();

  // Maze fully generated?
  if (generated) {

    // Initialize solver
    // by specified algorithm
    solverInit(algorithm);

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
    current = source;

    // Set the cost to 0
    current.cost = 0;

    // Enqueue to start processing
    queue.push(current);

    // Clear the parents map
    parents.clear();

    // Indicates beginning of path
    parents.set(current.key, null);

    // If we want to do it
    // in the background, execute it,
    // then execute highlight as the
    // callback to highlight the path
    if (!animated()) {

      execute(action, () => {

        solved = true;

        current = target

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

/**
 * Initializes the solver.
 */
function solverInit(algorithm) {

  switch (algorithm) {

    case dijkstra:
      initDijkstra();
      break;

    case aStar:
      initAStar();
      break;

    case DFS:
      queue = new Stack();
      break;

    case BFS:
      queue = new Queue();
      break;

    default:
      break;
  }
}
