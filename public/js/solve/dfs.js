const dfs = {

  init : () => queue = new Stack(),

//------------------------------------------------------------------------------

  DFS : () => {

    let u = queue.pop();

    if (Cell.equals(u, maze.target())) {

      maze.visit(u)

      maze.current = u;

      return true;
    }

    if (!u.visited) {

      // Mark as visited
      maze.visit(u)

      let neighbors = u.x();

      neighbors.forEach( v => {

        if (!maze.parents.has(v.key)) {

          maze.parents.set(v.key, u)

          queue.push(v);
        }

      });
    }

    return queue.length === 0;
  }

}
