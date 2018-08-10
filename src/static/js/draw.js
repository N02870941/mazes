let action = dfs;

/**
 * Main event loop that repeats forever.
 */
function draw() {

  // Don't draw if grid not
  // initialized yet.
  if (grid[0]) {

    if (action == dfs) {

        generated = action();
    }

    if (action === aStar && !solved) {

      solved = action();
    }


  }

  if (generated) {

    let first = grid[0];
    let last  = grid[grid.length - 1];

    first.walls[3] = false
    last.walls[1]  = false;

    first.show();
    last.show();
  }

}
