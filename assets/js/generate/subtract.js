const subtract = (() => {

  /**
   * Deletes walls between adjacent vertices.
   */
  function takeaway(discover, decrement, count) {
    if (count() <= 0)
      return true

    let u = queue.pop()

    if (!u.visited) {
      u.visited = true

      let neighbors = discover(u)

      neighbors.forEach(v => {
        if (v.visited) {
          return
        }

        maze.pave(u, v)
        decrement()
      });
    }

    return queue.size() === 0 || count() <= 0;
  }

  return {

    /**
     * Subtracts a specified number of randomly selected vertical walls from the grid.
     */
    vertical : () => {
      return takeaway(
        (c) => c.horizontalNeighbors(),
        ()  => maze.subtractionsV--,
        ()  => maze.subtractionsV
      )
    },

    /**
     * Subtracts a specified number of randomly selected horizontal walls from the grid.
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
