// TODO - http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html
// TODO - http://theory.stanford.edu/~amitp/GameProgramming/index.html

function initAStar() {

  // Comparator for heap that minimizes: f(n) = g(n) + h(n)
  let comparator = (a, b) => a.heuristic + a.cost < b.heuristic + b.cost;

  // Create new heap
  queue = new Heap(comparator);

  // Reset heuristics for grid
  grid.forEach( c => {

    c.heuristic = 0;
  });

  // Set the initial heuristic
  source.heuristic = Cell.euclidian(source, target);
}

//------------------------------------------------------------------------------

/**
 * A* main loop.
 */
function aStar() {

  // Extract min g(n) + h(n) value
  let u = queue.pop();

  // This cell is the target
  if (Cell.equals(target, u)) {

    current = u;

    return true;
  }

  // Mark as visited
  u.visited = true;

  // Highlight
  u.gradient();

  // Get neighbors
  let neighbors = u.x();

  // Loop through each one
  neighbors.forEach( v => {

    // Do no revisit visited nodes
    if (v.visited) {

      return;
    }

    // Compute alternative cost
    let cost = u.cost + 1;

    // A better path was found
    if (cost < v.cost) {

      // Store in predecessors map
      parents.set(v.key, u);

      // Update cost, g(n)
      v.cost = cost;

      // Update heuristic, h(n)
      v.heuristic = Cell.euclidian(v, target);

      // Enqueue for processing
      queue.push(v);
    }

  });

  return queue.empty();
}
