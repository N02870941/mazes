// TODO - http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html
// TODO - http://theory.stanford.edu/~amitp/GameProgramming/index.html

/**
 * Initializes the 'open set' min priority
 * binary heap with the specified comparator
 * for minimizing f(n) = g(n) + h(n).
 *
 * We set the initial heurstic value of each
 * cell 0, and as we go through the maze, we
 * will update each one upon discovery.
 */
function initAStar() {

  // TODO - Get heurstic from drop down

  // Comparator for heap that minimizes: f(n) = g(n) + h(n)
  let comparator = Cell.heuristics.comparators.standard;

  // Create new heap
  queue = new Heap(comparator);

  // Set the initial heuristic
  source.heuristic = Cell.euclidian(source, target);
}

//------------------------------------------------------------------------------

/**
 * A* main loop.
 */
function aStar() {

  return informedSearch(Cell.heuristics.euclidian);
}

//------------------------------------------------------------------------------

/**
 * Runs A* with a specified heuristic.
 */
function informedSearch(heuristic) {

  // Extract min by minimizing
  // f(n) = g(n) + h(n)
  let u = queue.pop();

  // This cell is the target,
  // so we have no more work to do
  if (Cell.equals(target, u)) {

    current = u;

    return true;
  }

  // Mark as visited
  u.visited = true;

  // Highlight it
  u.gradient();

  // Get neighbors
  let neighbors = u.x();

  // Loop through each one
  neighbors.forEach( v => {

    // Do no revisit visited nodes
    if (v.visited)
      return;

    // Compute alternative cost
    let cost = u.cost + 1;

    // A better path was found
    if (cost < v.cost) {

      // Update predecessors map
      parents.set(v.key, u);

      // Update actual cost, g(n)
      v.cost = cost;

      // Update heuristic cost, h(n)
      v.heuristic = heuristic(v, target);

      // Add to heap to visit later
      queue.push(v);
    }

  });

  return queue.empty();
}
