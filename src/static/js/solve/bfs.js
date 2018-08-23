function initBFS() {

  queue = new Queue();
}

//------------------------------------------------------------------------------

function BFS() {

  // Dequeue
  let u = queue.pop();

  // Found target
  if (Cell.equals(u, maze.target())) {

    current = u;

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

    // Highlight it
    v.gradient();

    // Store in map
    maze.parents.set(v.key, u)

    // Enqueue for processing
    queue.push(v);
  });

  return queue.length === 0;
}
