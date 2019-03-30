const bfs = {

  init : () => queue = new Queue(),

//------------------------------------------------------------------------------

  BFS : () => {

    // Dequeue
    let u = queue.pop();

    // Mark as visited
    maze.visit(u)

    // Found target
    if (Cell.equals(u, maze.target())) {

      maze.current = u;

      return true;
    }

    // Get neighbors
    let neighbors = u.x();

    // Explore each one
    neighbors.forEach( v => {

      // Do not enqueue visited vertices
      if (maze.parents.has(v.key)) {

        return;
      }

      // Store in map
      maze.parents.set(v.key, u)

      // Enqueue for processing
      queue.push(v);
    });

    return queue.length === 0;
  }

}
