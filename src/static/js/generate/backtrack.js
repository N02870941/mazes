
/**
 * Maze generating based on backtracking. The
 * discover() function determines how to choose
 * the next adjacent vertex. The dequeue function
 * determines how to select the next node to dequeue.
 * This has a direct connection with the branching
 * factor and difficulty of the maze.
 */
const backtrack = (() => {

  // Private functions
  function make(discover, dequeue) {

    // Mark as visited
    maze.current.visited = true;

    // Set back to white
    maze.current.clear();

    // Get random neighbor
    let next = Cell.randomNeighbor(maze.current);

    // Did one come back?
    if (next) {

      // Mark as visited
      next.visited = true;

      // Push current onto stack
      // for backtracking purposes
      stack.push(maze.current);

      // Remove the wall between
      // these two adjacent vertices
      maze.pave(maze.current, next);

      // Highlight end of path
      maze.current.highlight();

      // Shift the pointers
      maze.current = next;

    // We have reached a dead end
    // so we start back tracking
    } else if (stack.length > 0) {

      maze.current = dequeue(stack);
    }

    // Exit condition
    return stack.length === 0;
  }

  // Public functions
  return {

    /**
     * Generates using breadth-first search. This
     * results in a maze with a high branching factor
     * and relatively easy to find solution with the
     * naked eye. However, it takes longer to run
     * algorithmically because there are many potentially
     * promising paths.
     */
    bfs : () => make(Cell.randomNeighbor, (s) => s.shift()),

    /**
     * Generates using depth-first search. This
     * results in a maze with a low branching factor
     * and an extremely difficult to find solution with the
     * naked eye. However, the solution is easily found
     * algorithmically because dead ends are relatively
     * shorter, and there are far fever potentially promising paths
     * when compared with breadth-first search.
     */
    dfs : () => make(Cell.randomNeighbor, (s) => s.pop()),

    /**
     * Generates using a 50:50 hybrid of breadth-first
     * search and depth-first search. The only difference
     * between the two is that DFS uses as a stack, and
     * BFS uses a FIFO queue. The hybrid randomly alternates
     * with equal probability between treating the unvisited
     * set as a stack and a queue. This results in a higher branching
     * factor than BFS, thus a less obvious solution, but it
     * is still a lot more solvable than a pure DFS.
     */
    hybrid : () => {

      return make(Cell.randomNeighbor, (s) => {

        let n = floor(random(1, 101));

        if (n % 2 === 0)
          return s.shift();

        else
          return s.pop();

      });

    }

  }

})();
