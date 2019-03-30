const subtract = (() => {

  /**
   * Deletes walls between
   * adjacent vertices.
   */
  function takeaway(discover, decrement, count) {

    if (count() <= 0)
      return true

    // Dequeue
    let u = queue.pop()

    // If we have not
    // visited vertex yet
    if (!u.visited) {

      // Mark it as visited
      u.visited = true

      // Get adjacent vertices
      let neighbors = discover(u)

      // Explore each neighbor
      neighbors.forEach( v => {

        // Do not revisit
        if (v.visited) {

          return
        }

        // Pave a wall
        maze.pave(u, v)

        // Decrement counter
        decrement()
      });
    }

    return queue.size() === 0 || count() <= 0;
  }

  return {

    /**
     * Subtracts a specified number
     * of randomly selected vertical
     * walls from the grid.
     */
    vertical : () => {

      return takeaway(
        (c) => c.horizontalNeighbors(),
        ()  => maze.subtractionsV--,
        ()  => maze.subtractionsV
      )
    },

    /**
     * Subtracts a specified number
     * of randomly selected horizontal
     * walls from the grid.
     */
    horizontal : () => {

      return takeaway(
        (c) => c.verticalNeighbors(),
        ()  => maze.subtractionsH--,
        ()  => maze.subtractionsH
      )
    }
  }

})();
