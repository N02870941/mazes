function initDFS() {

  queue = new Stack();
}

//------------------------------------------------------------------------------

function DFS() {

  let u = queue.pop();

  if (Cell.equals(u, maze.target())) {

    current = u;

    return true;
  }

  if (!u.visited) {

    u.visited = true

    let neighbors = u.x();

    neighbors.forEach( v => {

      if (!maze.parents.has(v.key)) {

        v.gradient();

        maze.parents.set(v.key, u)

        queue.push(v);
      }

    });
  }

  return queue.length === 0;
}
