const dijkstra = {

  /**
   * One-time setup for Dijkstra's algorithm.
   */
  init : () => {

    // Create heap that compares vertices by their cost attribute
    queue = new Heap(Cell.heuristics.comparators.pureCost);
  },

//------------------------------------------------------------------------------

  /**
   * Main loop of Dijkstra's algorithm.
   */
  dijkstra : () => {

    // Extract min from heap
    let u = queue.pop();

    // Mark as visited
    maze.visit(u)

    // Found target?
    if (Cell.equals(maze.target(), u)) {

      // Set current for
      // backtracking
      maze.current = u;

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
        maze.parents.set(v.key, u);

        // Update cost, and decrease key
        // If the key is new, a push() occurs
        queue.decrease(v, cost);
      }
    });

    return queue.empty();
  }

}
