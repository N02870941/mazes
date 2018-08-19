/**
 * Solves the maze.
 */
function solve() {

  let algorithm = solving();

  switch (algorithm) {

    case dijkstra:
    queue = new Heap(); break;

    case aStar:
      queue = new Heap((a,b) => a.heuristic < b.heuristic); break;

    case DFS:
      queue = new Stack(); break;

    case BFS:
      queue = new Queue(); break;

    default:
      queue = new Stack();

      break;
  }

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
      c.cost    = Infinity;

      c.clear();
    });

    // Start at first cell
    current = source;

    // Set the cost to 0
    current.cost = 0;

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
 * Returns a randomly selected
 * unvisited adjacent vertex with
 * no heuristic.
 */
function rand(cell) {

  return next(
    cell,
    null,
    (n, distances) => n[floor(random(0, n.length))]
  );
}
