const subtract = {

  /**
   * Subtracts a specified number
   * of randomly selected vertical
   * walls from the grid.
   */
  vertical : () => {

    // Done?
    if (subtractionsV === 0) {

      return true;
    }

    let x = floor(random(0, grid.length-1));
    let y = x + 1;

    // Only pave if in same row
    if (grid[x].j === grid[y].j) {

      Cell.pave(grid[x], grid[y]);

      grid[x].clear();
      grid[y].clear();
    }

    // Decrement
    subtractionsV--;

    return subtractionsV <= 0;
  },

  /**
   * Subtracts a specified number
   * of randomly selected horizontal
   * walls from the grid.
   */
  horizontal : () => {

    // Done?
    if (subtractionsH <= 0) {

      return true;
    }

    let x = floor(random(0, grid.length-1));
    let y = x + (1 * cols);

    if (grid[x] && grid[y] && grid[x].i === grid[y].i) {

      Cell.pave(grid[x], grid[y]);

      grid[x].clear();
      grid[y].clear();

    }

    // Decrement
    subtractionsH--;

    return subtractionsH <= 0;
  }

};
