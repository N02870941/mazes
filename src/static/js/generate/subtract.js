const subtract = {

  /**
   * Subtracts a specified number
   * of randomly selected vertical
   * walls from the grid.
   */
  vertical : (n) => {

    for (let i = 0; i < n; i++) {

      let x = floor(random(0, grid.length-1))
      let y = x + 1

      Cell.pave(grid[x], grid[y])
    }

  },

  /**
   * Subtracts a specified number
   * of randomly selected horizontal
   * walls from the grid.
   */
  horizontal : (n) => {

  }

};
