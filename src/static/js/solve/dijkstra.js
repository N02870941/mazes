/**
 * One-time setup for Dijkstra's algorithm.
 */
function initDijkstra() {

  // Comparator that compares cell by cost
  let comparator = (a, b) => a.cost < b.cost;

  // Create heap that compares
  // vertices by their cost attribute
  queue = new Heap(comparator);
}

//------------------------------------------------------------------------------

/**
 * Main loop of Dijkstra's algorithm.
 */
function dijkstra() {

  // Extract min from heap
  let u = queue.pop();

  // Highlight it
  u.gradient();

  // Found target?
  if (Cell.equals(target, u)) {

    // Set current for
    // backtracking
    current = u;

    return true;
  }

  // Get neighbors
  let neighbors = u.x();

  // Loop through each one
  neighbors.forEach( v => {

    // Compute alternative cost
    let cost = u.cost + 1;

    // Is this better?
    if (cost < v.cost) {

      // Update parent
      parents.set(v.key, u);

      // Update cost, and decrease key
      queue.decrease(v, cost);
    }

  });

  return queue.empty();
}
